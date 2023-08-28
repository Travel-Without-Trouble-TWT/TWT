package com.BE.TWT.controller.schedule;

import com.BE.TWT.model.dto.schedule.AddCourse;
import com.BE.TWT.model.dto.schedule.DeleteCourse;
import com.BE.TWT.model.dto.schedule.UpdateCourse;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.service.schedule.DayScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/day")
@RequiredArgsConstructor
public class DayScheduleController {
    private final DayScheduleService dayScheduleService;

    @PostMapping("/plus")
    public ResponseEntity<DaySchedule> addDayCourse(@RequestBody @Valid AddCourse addCourse) {
        return ResponseEntity.ok(dayScheduleService.addCourse(addCourse));
    }

    @DeleteMapping("/minus")
    public void deleteDayCourse(@RequestBody @Valid DeleteCourse deleteCourse) {
        dayScheduleService.deleteCourse(deleteCourse);
    }

    @PutMapping("/time")
    public void updateCourseTime(@RequestBody @Valid UpdateCourse updateCourse) {
         dayScheduleService.updateCourseTime(updateCourse);
    }
}
