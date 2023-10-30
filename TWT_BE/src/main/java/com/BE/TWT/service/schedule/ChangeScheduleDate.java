package com.BE.TWT.service.schedule;


import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.SetDateDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Course;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.schedule.DayScheduleRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.*;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.NOT_REGISTERED_SCHEDULE;

@Service
@RequiredArgsConstructor
public class ChangeScheduleDate {
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final DayScheduleRepository dayScheduleRepository;
    private final DayScheduleService dayScheduleService;

    @Transactional
    public Schedule changeTravelDate(HttpServletRequest request, SetDateDto dto) {
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
        int days = (int) ChronoUnit.DAYS.between(parseStart, parseEnd) + 1;

        schedule.updateDate(parseStart, parseEnd, days);
        if (schedule.getMember().equals(member)) { // 스케줄 작성한 유저만 API 호출이 가능하도록
            List<DaySchedule> dayScheduleList = schedule.getDayScheduleList();

            if (days == dayScheduleList.size()) { // 1. 변경된 기간이 같을 때
                for (int i = 0; i < dayScheduleList.size(); i++) {
                    LocalDate date = parseStart.plusDays(i);
                    DaySchedule daySchedule = dayScheduleList.get(i);
                    daySchedule.changeDate(date);
                    LocalDateTime time = date.atTime(23, 59);

                    List<Course> courseList = daySchedule.getCourseList();
                    for (int j = 0; j < courseList.size(); j++) {
                        Course course = courseList.get(j);
                        course.setTime(time);
                    }
                    dayScheduleRepository.save(daySchedule);
                }
            }
            if (days > dayScheduleList.size()) { // 2. 변경된 기간이 더 길 때
                int size = dayScheduleList.size();
                for (int i = 0; i < dayScheduleList.size(); i++) {
                    LocalDate date = parseStart.plusDays(i);
                    DaySchedule daySchedule = dayScheduleList.get(i);
                    daySchedule.changeDate(date);
                    LocalDateTime time = date.atTime(23, 59);

                    List<Course> courseList = daySchedule.getCourseList();
                    for (int j = 0; j < courseList.size(); j++) {
                        Course course = courseList.get(j);
                        course.setTime(time);
                    }
                    dayScheduleRepository.save(daySchedule);
                }
                for (int j = size; j < days; j++) {
                    List<Course> courseList = new ArrayList<>();
                    LocalDate date = parseStart.plusDays(j);
                    DaySchedule daySchedule = DaySchedule.builder()
                            .day(date)
                            .dateNumber(j + 1)
                            .schedule(schedule)
                            .courseList(courseList)
                            .build();
                    dayScheduleRepository.save(daySchedule);
                    dayScheduleList.add(daySchedule);
                }
                schedule.changeDayScheduleList(dayScheduleList);
            }
            if (days < dayScheduleList.size()) { // 변경된 기간이 더 짧을 때
                if (days == 1) {
                    DaySchedule daySchedule = dayScheduleList.get(0);
                    daySchedule.changeDate(parseStart);
                    LocalDateTime time = parseStart.atTime(23, 59);
                    List<Course> courseList = daySchedule.getCourseList();
                    for (int i = 0; i < courseList.size(); i++) {
                        Course course = courseList.get(i);
                        course.setTime(time);
                    }
                    for (int j = 1; j < dayScheduleList.size(); j++) {
                        DaySchedule oldDaySchedule = dayScheduleList.get(j);

                        for (int k = 0; k < oldDaySchedule.getCourseList().size(); k++) {
                            Course course = oldDaySchedule.getCourseList().get(k);
                            course.setTime(time);
                            courseList.add(course);
                            dayScheduleRepository.save(daySchedule);
                            daySchedule.calculateLatitude(course.getLatitude(), course.getLongitude());
                        }
                    }
                    dayScheduleService.setDistance(courseList);
                    for (int x = 1; x < dayScheduleList.size(); x++) {
                        dayScheduleRepository.delete(dayScheduleList.get(x));
                    }
                    dayScheduleRepository.save(daySchedule);
                } else { // 변경 후 길이가 더 짧지만 1 은 아닐 때
                    for (int i = 0; i < days; i++) {
                        LocalDate date = parseStart.plusDays(i);
                        DaySchedule daySchedule = dayScheduleList.get(i);
                        daySchedule.changeDate(date);

                        LocalDateTime time = date.atTime(23, 59);
                        List<Course> courseList = daySchedule.getCourseList();
                        for (int j = 0; j < courseList.size(); j++) {
                            Course course = courseList.get(j);
                            course.setTime(time);
                        }
                        dayScheduleRepository.save(daySchedule);
                    }
                    DaySchedule daySchedule = dayScheduleList.get(days - 1);
                    for (int j = days; j < dayScheduleList.size(); j++) {
                        DaySchedule oldDaySchedule = dayScheduleList.get(j);

                        LocalDateTime time = parseEnd.atTime(23, 59);
                        List<Course> courseList = oldDaySchedule.getCourseList();
                        for (int k = 0; k < courseList.size(); k++) {
                            Course course = courseList.get(k);
                            course.setTime(time);

                            daySchedule.addCourse(course);
                            dayScheduleRepository.save(daySchedule);
                            daySchedule.calculateLatitude(course.getLatitude(), course.getLongitude());
                        }
                    }
                    dayScheduleRepository.save(daySchedule);

                    for (int k = dayScheduleList.size() - 1; k >= days; k--) {
                        dayScheduleRepository.delete(dayScheduleList.get(k));
                    }
                }
            }
        } else {
            throw new MemberException(AUTHENTICATION_FAILURE);
        }
        scheduleRepository.save(schedule);
        return schedule;
    }
}
