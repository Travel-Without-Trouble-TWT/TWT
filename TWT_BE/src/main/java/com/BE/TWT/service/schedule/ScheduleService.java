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
import java.time.LocalDateTime;
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
          
        schedule.updateDate(setDateDto.getStartAt(), setDateDto.getEndAt());

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

        String startDate = dto.getStartAt();
        String endDate = dto.getEndAt();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd"); // 프론트에서 날짜 값을 해당 형식으로 받는다.

        LocalDate parseStart = LocalDate.parse(startDate, formatter);
        LocalDate parseEnd = LocalDate.parse(endDate, formatter);
        int days = (int) ChronoUnit.DAYS.between(parseStart, parseEnd) + 1; // 새로운 여행일 수

        schedule.updateDate(parseStart, parseEnd, days); // 새로운 여행 계획 날짜 값 입력

        if (schedule.getMember().equals(member)) { // 스케줄 작성한 유저만 API 호출이 가능하도록
            List<DaySchedule> oldDayScheduleList = schedule.getDayScheduleList();
            List<DaySchedule> newDayScheduleList = new ArrayList<>();

            if (oldDayScheduleList.size() > days) { // 기간 변경 후 일 수가 더 짧을 경우
                for (int i = 0; i < days; i++) {
                    LocalDate newDate = parseStart.plusDays(i);
                    if (i == days - 1) {
                        // 변경 후 일정 마지막 날에 기존 일정들을 모두 넣는다.
                        for (int j = days - 1; j < oldDayScheduleList.size(); j++) {
                            DaySchedule daySchedule = oldDayScheduleList.get(j);
                            daySchedule.changeDate(newDate);

                            for (int g = 0; g < daySchedule.getCourseList().size(); g++) {
                                Course course = daySchedule.getCourseList().get(g);

                                LocalDateTime time = newDate.atTime(LocalTime.of(23, 59));
                                course.setTime(time);
                            }

                            if (daySchedule.getCourseList().size() >= 2) {
                                for (int k = 0; k < daySchedule.getCourseList().size() - 1; k++) {
                                    Course course = daySchedule.getCourseList().get(k);
                                    Course nextCourse = daySchedule.getCourseList().get(k + 1);

                                    double x1 = course.getLatitude();
                                    double x2 = nextCourse.getLongitude();
                                    double y1 = course.getLongitude();
                                    double y2 = nextCourse.getLongitude();
                                    course.calculateDistance(x1, y1, x2, y2);

                                    LocalDateTime time = newDate.atTime(LocalTime.of(23, 59));
                                    course.setTime(time);
                                }
                                dayScheduleRepository.save(daySchedule);
                                newDayScheduleList.add(daySchedule);
                            }
                        }
                    }
                }
            } else if (oldDayScheduleList.size() < days) {
                for (int j = 0; j < days; j++) {
                    LocalDate newDate = parseStart.plusDays(j);
                    if (j < oldDayScheduleList.size()) {
                        DaySchedule daySchedule = oldDayScheduleList.get(j);
                        for (int k = 0; k < daySchedule.getCourseList().size(); k++) {
                            Course course = daySchedule.getCourseList().get(k);
                            LocalDateTime time = newDate.atTime(LocalTime.of(23, 59));
                            course.setTime(time);
                        }

                        daySchedule.changeDate(newDate);
                        newDayScheduleList.add(daySchedule);
                    } else {
                        List<Course> courseList = new ArrayList<>();
                        LocalDate date = parseStart.plusDays(j);

                        DaySchedule daySchedule = DaySchedule.builder()
                                    .schedule(schedule)
                                    .courseList(courseList)
                                    .dateNumber(j + 1)
                                    .day(date)
                                    .build();

                        dayScheduleRepository.save(daySchedule);
                        newDayScheduleList.add(daySchedule);
                    }
                }
            } else {
                for (int i = 0; i < days; i++) {
                    LocalDate newDate = parseStart.plusDays(i);
                    DaySchedule daySchedule = oldDayScheduleList.get(i);
                    for (int j = 0; j < daySchedule.getCourseList().size(); j++) {
                        Course course = daySchedule.getCourseList().get(j);
                        LocalDateTime time = newDate.atTime(LocalTime.of(23, 59));
                        course.setTime(time);
                    }
                    daySchedule.changeDate(newDate);
                    newDayScheduleList.add(daySchedule);
                }
            }
            schedule.changeDayScheduleList(newDayScheduleList);
        }
        scheduleRepository.save(schedule);
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

