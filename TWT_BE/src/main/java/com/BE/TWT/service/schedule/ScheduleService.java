package com.BE.TWT.service.schedule;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.CreateScheduleDto;
import com.BE.TWT.model.dto.schedule.SetDateDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import com.BE.TWT.service.function.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.NOT_REGISTERED_SCHEDULE;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.UNAUTHORIZED_REQUEST;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;

    public Schedule createSchedule (HttpServletRequest request, CreateScheduleDto dto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Schedule schedule = Schedule.builder()
                .scheduleName(dto.getScheduleName())
                .startAt(LocalDate.now())
                .endAt(LocalDate.now())
                .travelPlace(dto.getTravelPlace())
                .member(member)
                .build();

        return scheduleRepository.save(schedule);
    }

    @Transactional
    public Schedule setDate(SetDateDto setDateDto) { // 선택 여행지 페이지의 날짜 입력 API
        Schedule schedule = scheduleRepository.findById(setDateDto.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate startDate = setDateDto.getStartAt();
        String formatStart = startDate.format(formatter);
        LocalDate endDate = setDateDto.getEndAt();
        String formatEnd = endDate.format(formatter);

        LocalDate parseStart = LocalDate.parse(formatStart, formatter);
        LocalDate parseEnd = LocalDate.parse(formatEnd, formatter);
        schedule.updateDate(parseStart, parseEnd);

        schedule.updateDate(setDateDto.getStartAt(), setDateDto.getEndAt());
     
        int days = (int) ChronoUnit.DAYS.between(startDate, endDate);
        schedule.insertDays(days);
        List<DaySchedule> dayScheduleList = new ArrayList<>();

        for (int j = 0; j < days; j++) {
            DaySchedule daySchedule = new DaySchedule();
            dayScheduleList.add(daySchedule);
        }

        schedule.changeDayScheduleList(dayScheduleList);

        return schedule;
    }

    /** 여행 계획 날짜 변경 로직 개념
     *  기존의 리스트를 불러와서 가지고 있는 채로 이후의 날짜로 리스트를 새로 생성한다.
     *  수정한 리스트의 길이가 짧을 경우에 마지막 날에 몰아넣는 구조로 구현하고
     *  길이가 같거나 길 경우에는 차례대로 옮겨 담는 로직을 구현한다.
     */
    @Transactional
    public Schedule changeTravelDate(SetDateDto dto) { // 여행 계획 날짜 변경
        Schedule schedule = scheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        List<DaySchedule> oldDayScheduleList = schedule.getDayScheduleList();
        List<DaySchedule> newDayScheduleList = new ArrayList<>();

        LocalDate startDate = dto.getStartAt();
        LocalDate endDate = dto.getEndAt();
        int days = (int) ChronoUnit.DAYS.between(startDate, endDate);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        String formatStart = startDate.format(formatter);
        String formatEnd = endDate.format(formatter);

        LocalDate parseStart = LocalDate.parse(formatStart, formatter);
        LocalDate parseEnd = LocalDate.parse(formatEnd, formatter);
        schedule.updateDate(parseStart, parseEnd);

        if(oldDayScheduleList.size() > days) { // 변경 후 기간이 더 짧다
            for (int i = 0; i < days; i++) {
                if (i == days - 1) {
                    // 변경 후 일정의 마지막 날
                    for (int j = days - 1; j < oldDayScheduleList.size(); j++) {
                        newDayScheduleList.add(oldDayScheduleList.get(j));
                    }
                } else {
                    newDayScheduleList.add(oldDayScheduleList.get(i));
                }
            }
        } else if (oldDayScheduleList.size() < days) { // 변경 후 기간이 더 길다
            for (int i = 0; i < days; i++) {
                if(i < oldDayScheduleList.size()) {
                    newDayScheduleList.add(oldDayScheduleList.get(i));
                } else {
                    DaySchedule daySchedule = new DaySchedule();
                    newDayScheduleList.add(daySchedule);
                }
            }
        } else { // 기간이 같다
            for (int i = 0; i < days; i++) {
                newDayScheduleList.add(oldDayScheduleList.get(i));
            }
        }

        schedule.changeDayScheduleList(newDayScheduleList);


        return schedule;
    }

    public void deleteSchedule (HttpServletRequest request, Long scheduleId) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        if (!schedule.getMember().equals(member)) { // 스케줄 삭제는 생성한 유저만 가능하다
            throw new ScheduleException(UNAUTHORIZED_REQUEST);
        }
        scheduleRepository.delete(schedule);
    }

    public Schedule updateSchedulePhoto (MultipartFile file, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        String photoUrl = s3Service.uploadFile(file);

        schedule.uploadPhoto(photoUrl);

        return schedule;
    }
}

