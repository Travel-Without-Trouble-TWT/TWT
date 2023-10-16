package com.BE.TWT.service.schedule;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.*;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Course;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.location.PlaceRepository;
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
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;
import static com.BE.TWT.exception.message.PlaceErrorMessage.WRONG_ADDRESS;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.NOT_REGISTERED_SCHEDULE;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.UNAUTHORIZED_REQUEST;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;
    private final DayScheduleRepository dayScheduleRepository;
    private final PlaceRepository placeRepository;
    private final ScheduleDefaultImageUrl defaultImageUrl;

    public Schedule createSchedule (HttpServletRequest request, CreateScheduleDto dto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Place place = placeRepository.findById(dto.getPlaceId())
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd"); // 프론트에서 날짜 값을 해당 형식으로 받는다.
        LocalDate startAt = LocalDate.parse(dto.getStartAt(), formatter);
        LocalDate endAt = LocalDate.parse(dto.getEndAt(), formatter);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));
        int days = (int) ChronoUnit.DAYS.between(startAt, endAt) + 1;

        String defaultImage = defaultImageUrl.findDefaultImage(place.getPlaceLocation());

        Schedule schedule = Schedule.builder()
                .scheduleName(dto.getPlaceLocation() + " 여행")
                .startAt(startAt)
                .endAt(endAt)
                .travelPlace(dto.getPlaceLocation())
                .days(days)
                .member(member)
                .scheduleImageUrl(defaultImage)
                .build();

        Schedule schedule1 = scheduleRepository.save(schedule);

        List<DaySchedule> dayScheduleList = new ArrayList<>();

        for (int i = 0; i < days; i++) {
            List<Course> courseList = new ArrayList<>();
            LocalDate date = startAt.plusDays(i);
            DaySchedule daySchedule = DaySchedule.builder()
                    .schedule(schedule)
                    .dateNumber(i + 1)
                    .day(date)
                    .courseList(courseList)
                    .build();

            if (dto.getWhen() == i) {
                LocalDateTime time = date.atTime(LocalTime.of(23, 59));

                Course course = Course.builder()
                        .placeName(place.getPlaceName())
                        .placeType(place.getPlaceType())
                        .latitude(place.getLatitude())
                        .longitude(place.getLongitude())
                        .arriveAt(time)
                        .placeId(place.getId())
                        .build();

                daySchedule.addCourse(course);
                daySchedule.calculateLatitude(course.getLatitude(), course.getLongitude());
            }
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
            scheduleRepository.save(schedule);
        } else {
            throw new ScheduleException(UNAUTHORIZED_REQUEST);
        }
    }

    @Transactional
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

        List<DaySchedule> dayScheduleList = dayScheduleRepository.findAllBySchedule(schedule);
        dayScheduleRepository.deleteAllInBatch(dayScheduleList);

        scheduleRepository.delete(schedule);
    }

    public Schedule updateSchedulePhoto (MultipartFile file, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        String photoUrl = s3Service.uploadFile(file);

        schedule.uploadPhoto(photoUrl);
        scheduleRepository.save(schedule);

        return schedule;
    }

    public ScheduleDetail readScheduleDetail(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        List<DaySchedule> dayScheduleList = dayScheduleRepository.findAllBySchedule(schedule);

        return ScheduleDetail.builder()
                .id(scheduleId)
                .scheduleName(schedule.getScheduleName())
                .travelPlace(schedule.getTravelPlace())
                .startAt(schedule.getStartAt())
                .endAt(schedule.getEndAt())
                .scheduleImageUrl(schedule.getScheduleImageUrl())
                .memberId(schedule.getMember().getId())
                .dayScheduleList(dayScheduleList)
                .build();
    }
}