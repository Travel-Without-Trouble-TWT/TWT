package com.BE.TWT.controller.schedule;

import com.BE.TWT.model.dto.schedule.DeleteCourse;
import com.BE.TWT.model.dto.schedule.UpdateCourse;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.service.schedule.DayScheduleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api(tags = "당일 일정 API")
@RestController
@RequestMapping("/daily")
@RequiredArgsConstructor
public class DayScheduleController {
    private final DayScheduleService dayScheduleService;

    @ApiOperation(value = "코스 삭제")
    @Operation(description = "당일 일정에 코스 삭제 API")
    @DeleteMapping("/del")
    public void deleteDayCourse(@RequestBody @Valid DeleteCourse deleteCourse) {
        dayScheduleService.deleteCourse(deleteCourse);
    }

    @ApiOperation(value = "코스 시간 설정")
    @Operation(description = "당일 일정의 코스 시간 설정 API")
    @PutMapping("/fix")
    public void updateCourseTime(@RequestBody @Valid UpdateCourse updateCourse) {
         dayScheduleService.updateCourseTime(updateCourse);
    }

    @ApiOperation(value = "daySchedule 조회")
    @Operation(description = "당일 일정 조회 API")
    @GetMapping("/info")
    public ResponseEntity<DaySchedule> readDaySchedule(@RequestParam @Valid Long dayScheduleId) {
        return ResponseEntity.ok(dayScheduleService.viewDaySchedule(dayScheduleId));
    }
}
