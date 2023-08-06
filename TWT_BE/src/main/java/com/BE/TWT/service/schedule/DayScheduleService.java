package com.BE.TWT.service.schedule;

import com.BE.TWT.model.dto.schedule.AddCourse;
import com.BE.TWT.model.dto.schedule.DeleteCourse;
import com.BE.TWT.model.dto.schedule.UpdateCourse;
import com.BE.TWT.model.entity.schedule.Course;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.repository.schedule.DaySchedueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DayScheduleService {
    private final DaySchedueRepository daySchedueRepository;

    public DaySchedule addCourse(AddCourse addCourse) { // 코스 추가
        DaySchedule daySchedule = daySchedueRepository.findById(addCourse.getDayScheduleId()).get();

        Course course = Course.builder()
                .placeId(addCourse.getPlaceId())
                .build();

        daySchedule.addCourse(course);

        return daySchedule;
    }

    public DaySchedule deleteCourse(DeleteCourse deleteCourse) { // 코스 삭제
        DaySchedule daySchedule = daySchedueRepository.findById(deleteCourse.getDayScheduleId()).get();

        for (int i = 0; i < daySchedule.getCourseList().size(); i++) {
            Course course = daySchedule.getCourseList().get(i);

            if (course.getPlaceId().equals(deleteCourse.getPlaceId())) {
                daySchedule.deleteCourse(course);
                break;
            }
        }

        return daySchedule;
    }

    public void updateCourseTime(UpdateCourse updateCourse) { // 코스 시간 설정
        DaySchedule daySchedule = daySchedueRepository.findById(updateCourse.getDayScheduleId()).get();

        for (int i = 0; i < daySchedule.getCourseList().size(); i++) {
            Course course = daySchedule.getCourseList().get(i);

            if (course.getPlaceId().equals(updateCourse.getPlaceId())) {
                course.setTime(updateCourse.getArriveAt());
                break;
            }
        }
    }
}
