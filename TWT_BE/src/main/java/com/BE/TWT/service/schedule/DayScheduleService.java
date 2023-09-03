package com.BE.TWT.service.schedule;

import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.AddNewCourse;
import com.BE.TWT.model.dto.schedule.DeleteCourse;
import com.BE.TWT.model.dto.schedule.UpdateCourse;
import com.BE.TWT.model.entity.schedule.Course;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.schedule.DayScheduleRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;

import static com.BE.TWT.exception.message.ScheduleErrorMessage.NOT_REGISTERED_SCHEDULE;

@Service
@RequiredArgsConstructor
public class DayScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final DayScheduleRepository dayScheduleRepository;

    @Transactional
    public Schedule addNewCourse(AddNewCourse course) { // 코스 추가
        Schedule schedule = scheduleRepository.findById(course.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        DaySchedule daySchedule = schedule.getDayScheduleList().get(course.getDay());
        LocalDateTime time = daySchedule.getDay().atTime(LocalTime.of(0, 0)); // 00:00으로 설정

        Course addCourse = Course.builder()
                .placeId(course.getPlaceId())
                .arriveAt(time)
                .build();
        daySchedule.addCourse(addCourse);
        saveDaySchedule(daySchedule);

        return schedule;
    }

    public void saveDaySchedule(DaySchedule daySchedule) { // 시간 순 정렬
        daySchedule.getCourseList().sort(Comparator.comparing(Course::getArriveAt));
        dayScheduleRepository.save(daySchedule);
    }

    public DaySchedule viewDaySchedule(Long dayScheduleId) {
        return dayScheduleRepository.findById(dayScheduleId)
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));
    }

    public void updateCourseTime(UpdateCourse updateCourse) { // 코스 시간 업데이트 후 daySchedule 재정렬
        DaySchedule daySchedule = dayScheduleRepository.findById(updateCourse.getDayScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        Course course = daySchedule.getCourseList().get(updateCourse.getIndex());

        course.setTime(updateCourse.getArriveAt());

        saveDaySchedule(daySchedule);
    }

    public void deleteCourse(DeleteCourse deleteCourse) {
        DaySchedule daySchedule = dayScheduleRepository.findById(deleteCourse.getDayScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        Course course = daySchedule.getCourseList().get(deleteCourse.getIndex());

        daySchedule.deleteCourse(course);
        saveDaySchedule(daySchedule);
    }
}
