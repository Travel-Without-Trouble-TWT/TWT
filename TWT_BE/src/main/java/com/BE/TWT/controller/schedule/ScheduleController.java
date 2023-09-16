package com.BE.TWT.controller.schedule;

import com.BE.TWT.model.dto.schedule.CreateScheduleDto;
import com.BE.TWT.model.dto.schedule.SetDateDto;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.service.schedule.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @PostMapping("/create")
    public ResponseEntity<Schedule> createSchedule(HttpServletRequest request,
                                                  @RequestBody @Valid CreateScheduleDto createScheduleDto) {

        return ResponseEntity.ok(scheduleService.createSchedule(request, createScheduleDto));
    }

    @PutMapping("/date")
    public ResponseEntity<Schedule> setScheduleDate(@RequestBody @Valid SetDateDto setDateDto) {
        return ResponseEntity.ok(scheduleService.setDate(setDateDto));
    }

    @PutMapping("/change")
    public ResponseEntity<Schedule> changeScheduleDate(@RequestBody @Valid SetDateDto setDateDto) {
        return ResponseEntity.ok(scheduleService.changeTravelDate(setDateDto));
    }

    @DeleteMapping("/cancel")
    public void deleteSchedule(HttpServletRequest request,
                               @RequestParam @Valid Long scheduleId) {
        scheduleService.deleteSchedule(request, scheduleId);
    }

    @PutMapping("/photo")
    public ResponseEntity<Schedule> setSchedulePhoto(@RequestPart(value = "file", required = false)MultipartFile file,
                                                     @RequestPart(value = "request") @Valid Long scheduleId) {
        return ResponseEntity.ok(scheduleService.updateSchedulePhoto(file, scheduleId));
    }
}
