package com.BE.TWT.service.schedule;

import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.model.dto.schedule.AddNewCourse;
import com.BE.TWT.model.dto.schedule.DeleteCourse;
import com.BE.TWT.model.dto.schedule.UpdateCourse;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.schedule.Course;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.schedule.DayScheduleRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Comparator;
import java.util.List;

import static com.BE.TWT.exception.message.PlaceErrorMessage.WRONG_ADDRESS;
import static com.BE.TWT.exception.message.ScheduleErrorMessage.NOT_REGISTERED_SCHEDULE;

@Service
@RequiredArgsConstructor
public class DayScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final DayScheduleRepository dayScheduleRepository;
    private final PlaceRepository placeRepository;

    @Transactional
    public Schedule addNewCourse(AddNewCourse course) { // 코스 추가
        Schedule schedule = scheduleRepository.findById(course.getScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        DaySchedule daySchedule = schedule.getDayScheduleList().get(course.getWhen());
        LocalDateTime time = daySchedule.getDay().atTime(LocalTime.of(23, 59));
        Place place = placeRepository.findById(course.getPlaceId())
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        Course addCourse = Course.builder()
                .placeName(place.getPlaceName())
                .placeType(place.getPlaceType())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .arriveAt(time)
                .placeId(place.getId())
                .build();

        daySchedule.addCourse(addCourse);
        daySchedule.calculateLatitude(addCourse.getLatitude(), addCourse.getLongitude());
        saveDaySchedule(daySchedule);
        setDistance(daySchedule.getCourseList());

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
        setDistance(daySchedule.getCourseList());
    }

    public void deleteCourse(DeleteCourse deleteCourse) {
        DaySchedule daySchedule = dayScheduleRepository.findById(deleteCourse.getDayScheduleId())
                .orElseThrow(() -> new ScheduleException(NOT_REGISTERED_SCHEDULE));

        Course course = daySchedule.getCourseList().get(deleteCourse.getIndex());

        daySchedule.deleteCourse(course);
        daySchedule.calculateLatitude(-course.getLatitude(), -course.getLongitude());
        saveDaySchedule(daySchedule);
        setDistance(daySchedule.getCourseList());
    }

    public void setDistance(List<Course> courseList) {
        if (courseList.size() > 1) {
            for (int i = 0; i < courseList.size() - 1; i++) {
                double x1 = courseList.get(i).getLatitude();
                double y1 = courseList.get(i).getLongitude();
                double x2 = courseList.get(i + 1).getLatitude();
                double y2 = courseList.get(i + 1).getLongitude();

                Course course = courseList.get(i);

                course.calculateDistance(x1, y1, x2, y2);
            }
        }
    }
}
