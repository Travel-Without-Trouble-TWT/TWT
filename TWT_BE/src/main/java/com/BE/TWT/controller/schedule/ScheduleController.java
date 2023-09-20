package com.BE.TWT.controller.schedule;

import com.BE.TWT.model.dto.schedule.EditScheduleNameDto;
import com.BE.TWT.model.dto.schedule.SetDateDto;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.service.schedule.ScheduleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Api(tags = "일정 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @ApiOperation(value = "스케줄 추가")
    @Operation(description = "최초 스케줄 추가 API")
    @PostMapping("/create")
    public ResponseEntity<Schedule> createSchedule(HttpServletRequest request,
                                                  @RequestBody @Valid CreateScheduleDto createScheduleDto) {

        return ResponseEntity.ok(scheduleService.createSchedule(request, createScheduleDto));
    }

    @ApiOperation(value = "스케줄 날짜 설정")
    @Operation(description = "스케줄 날짜 최초 설정 API, 최초엔 추가한 날 당일로 지정된 상태")
    @PutMapping("/date")
    public ResponseEntity<Schedule> setScheduleDate(HttpServletRequest request, @RequestBody @Valid SetDateDto setDateDto) {
        return ResponseEntity.ok(scheduleService.setDate(request, setDateDto));
    }

    @ApiOperation(value = "스케줄 날짜 변경")
    @Operation(description = "스케줄 날짜 변경 API, 최초 설정과는 다른 로직")
    @PutMapping("/change")
    public ResponseEntity<Schedule> changeScheduleDate(HttpServletRequest request, @RequestBody @Valid SetDateDto setDateDto) {
        return ResponseEntity.ok(scheduleService.changeTravelDate(request, setDateDto));
    }

    @ApiOperation(value = "스케줄 삭제")
    @Operation(description = "스케줄 삭제 API")
    @DeleteMapping("/cancel")
    public void deleteSchedule(HttpServletRequest request,
                               @RequestParam @Valid Long scheduleId) {
        scheduleService.deleteSchedule(request, scheduleId);
    }

    @ApiOperation(value = "스케줄 사진 추가")
    @Operation(description = "스케줄 썸네일 및 대표 사진 추가 API")
    @PutMapping("/photo")
    public ResponseEntity<Schedule> setSchedulePhoto(@RequestPart(value = "file", required = false)MultipartFile file,
                                                     @RequestPart(value = "request") @Valid Long scheduleId) {
        return ResponseEntity.ok(scheduleService.updateSchedulePhoto(file, scheduleId));
    }

    @ApiOperation(value = "스케줄 이름 변경")
    @Operation(description = "스케줄 최초 이름은 지역명 + 여행 으로 되어있음!")
    @PutMapping("/edit")
    public void editScheduleName(HttpServletRequest request, @RequestBody @Valid EditScheduleNameDto dto) {
        scheduleService.editScheduleName(request, dto);
    }
}
