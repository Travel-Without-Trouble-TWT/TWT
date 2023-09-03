package com.BE.TWT.service.schedule;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.AddNewCourse;
import com.BE.TWT.model.dto.schedule.CreateScheduleDto;
import com.BE.TWT.model.dto.schedule.EditScheduleNameDto;
import com.BE.TWT.model.dto.schedule.SetDateDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.schedule.DayScheduleRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import com.BE.TWT.service.function.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    private final DayScheduleService dayScheduleService;
    private final DayScheduleRepository dayScheduleRepository;

    public Schedule addNewSchedule(HttpServletRequest request, CreateScheduleDto dto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        LocalDate startAt = LocalDate.parse(dto.getStartAt());
        LocalDate endAt = LocalDate.parse(dto.getEndAt());
        // TODO 프론트에서 받는 날짜 값이 String, Object, Date 어느 것으로 받는지 볼 것

        if (scheduleRepository.findByMemberAndScheduleNameAndTravelPlaceAndStartAtAndEndAt
                (member, dto.getScheduleName(), dto.getPlaceLocation(), startAt, endAt).isEmpty()) {
          return createSchedule(request, dto.getPlaceLocation(), startAt, endAt);
        } else {
            Schedule schedule = scheduleRepository.findByMemberAndScheduleNameAndTravelPlaceAndStartAtAndEndAt
                    (member, dto.getScheduleName(), dto.getPlaceLocation(), startAt, endAt).get();

            AddNewCourse course = AddNewCourse.builder()
                    .day(dto.getWhen())
                    .scheduleId(schedule.getId())
                    .placeId(dto.getPlaceId())
                    .build();
            return dayScheduleService.addNewCourse(course);
        }
    }

    public Schedule createSchedule (HttpServletRequest request, String travelPlace, LocalDate startAt, LocalDate endAt) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));
        int days = (int) ChronoUnit.DAYS.between(startAt, endAt) + 1;

        Schedule schedule = Schedule.builder()
                .scheduleName(travelPlace + " 여행")
                .startAt(startAt)
                .endAt(endAt)
                .travelPlace(travelPlace)
                .days(days)
                .member(member)
                .build();

        Schedule schedule1 = scheduleRepository.save(schedule);

        List<DaySchedule> dayScheduleList = new ArrayList<>();

        for (int i = 0; i < days; i++) {
            LocalDate date = startAt.plusDays(i);
            DaySchedule daySchedule = DaySchedule.builder()
                    .schedule(schedule)
                    .dateNumber(i + 1)
                    .day(date)
                    .build();

            dayScheduleRepository.save(daySchedule);
            dayScheduleList.add(daySchedule);
        }

        schedule1.insertDays(days);
        schedule1.changeDayScheduleList(dayScheduleList);
        return schedule1;
    }

    public void editScheduleName (HttpServletRequest request, EditScheduleNameDto dto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Schedule schedule = scheduleRepository.findById(dto.getScheduleId()).get();

        if (schedule.getMember().equals(member)) {
            schedule.editScheduleName(dto.getScheduleName());
        } else {
            throw new ScheduleException(UNAUTHORIZED_REQUEST);
        }
    }

    @Transactional
    public Schedule setDate(HttpServletRequest request, SetDateDto setDateDto) { // 선택 여행지 페이지의 날짜 입력 API
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Schedule schedule = scheduleRepository.findById(setDateDto.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        if (schedule.getMember().equals(member)) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            String startDate = setDateDto.getStartAt();
            String endDate = setDateDto.getEndAt();

            LocalDate parseStart = LocalDate.parse(startDate, formatter);
            LocalDate parseEnd = LocalDate.parse(endDate, formatter);
            schedule.updateDate(parseStart, parseEnd);

            int days = (int) ChronoUnit.DAYS.between(parseStart, parseEnd);
            schedule.insertDays(days);
            List<DaySchedule> dayScheduleList = new ArrayList<>();

            for (int j = 0; j < days; j++) {
                DaySchedule daySchedule = new DaySchedule();
                dayScheduleList.add(daySchedule);
            }
            schedule.changeDayScheduleList(dayScheduleList);
        } else {
            throw new ScheduleException(UNAUTHORIZED_REQUEST);
        }
        return schedule;
    }

    @Transactional
    public Schedule changeTravelDate(HttpServletRequest request, SetDateDto dto) { // 여행 계획 날짜 변경
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Schedule schedule = scheduleRepository.findById(dto.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        String startDate = dto.getStartAt().toString();
        String endDate = dto.getEndAt().toString();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

        LocalDate parseStart = LocalDate.parse(startDate, formatter);
        LocalDate parseEnd = LocalDate.parse(endDate, formatter);
        int days = (int) ChronoUnit.DAYS.between(parseStart, parseEnd);

        schedule.updateDate(parseStart, parseEnd);

        if (schedule.getMember().equals(member)) {
            List<DaySchedule> oldDayScheduleList = schedule.getDayScheduleList();
            List<DaySchedule> newDayScheduleList = new ArrayList<>();


            if (oldDayScheduleList.size() > days) { // 변경 후 기간이 더 짧다
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
                    if (i < oldDayScheduleList.size()) {
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
        } else {
            throw new ScheduleException(UNAUTHORIZED_REQUEST);
        }


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