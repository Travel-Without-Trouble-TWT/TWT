package com.BE.TWT.controller.schedule;

import com.BE.TWT.model.dto.function.SaveSharedScheduleDto;
import com.BE.TWT.model.dto.schedule.*;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.service.function.SearchService;
import com.BE.TWT.service.schedule.ShareSchedule;
import com.BE.TWT.service.schedule.ChangeScheduleDate;
import com.BE.TWT.service.schedule.DayScheduleService;
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
import java.util.List;

@Api(tags = "일정 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final SearchService searchService;
    private final DayScheduleService dayScheduleService;
    private final ChangeScheduleDate changeScheduleDate;
    private final ShareSchedule shareScheduleService;

    @ApiOperation(value = "스케줄 추가")
    @Operation(description = "최초 스케줄 추가 API")
    @PostMapping("/create")
    public ResponseEntity<Schedule> createSchedule(HttpServletRequest request,
                                                   @RequestBody @Valid CreateScheduleDto dto) {
        return ResponseEntity.ok(scheduleService.createSchedule(request, dto));
    }

    @ApiOperation(value = "기존 스케줄 일정 추가")
    @Operation(description = "기존 스케줄 추가 API")
    @PutMapping("/add")
    public ResponseEntity<Schedule> addSchedule(@RequestBody @Valid AddNewCourse dto) {
        return ResponseEntity.ok(dayScheduleService.addNewCourse(dto));
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
        return ResponseEntity.ok(changeScheduleDate.changeTravelDate(request, setDateDto));
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
                                                     @RequestParam @Valid Long scheduleId) {
        return ResponseEntity.ok(scheduleService.updateSchedulePhoto(file, scheduleId));
    }

    @ApiOperation(value = "스케줄 이름 변경")
    @Operation(description = "스케줄 최초 이름은 지역명 + 여행 으로 되어있음!")
    @PutMapping("/edit")
    public void editScheduleName(HttpServletRequest request, @RequestBody @Valid EditScheduleNameDto dto) {
        scheduleService.editScheduleName(request, dto);
    }
    @ApiOperation(value = "같은 여행지 스케줄 조회")
    @Operation(description = "선택 여행지에서 일정 추가할 때 기존 일정 1, 2, 3, ... 리스트")
    @GetMapping("/choose")
    public ResponseEntity<List<Schedule>> chooseSchedule(HttpServletRequest request,
                                                         @RequestParam @Valid String placeLocation) {
        return ResponseEntity.ok(searchService.
                findSamePlaceLocationSchedule(request, placeLocation));
    }

    @ApiOperation(value = "특정 스케줄 전체 일정 상세 조회")
    @Operation(description = "스케줄에 포함된 DaySchedule 리스트도 모두 조회")
    @GetMapping("/info")
    public ResponseEntity<ScheduleDetail> readScheduleInfo(@RequestParam @Valid Long scheduleId) {
        return ResponseEntity.ok(scheduleService.readScheduleDetail(scheduleId));
    }

    @ApiOperation(value = "스케줄 흡수하기")
    @Operation(description = "다른 유저의 스케줄을 내 스케줄로 가져오는 기능")
    @PostMapping("/share")
    public ResponseEntity<Schedule> saveSharedSchedule (HttpServletRequest request,
                                                        @RequestBody @Valid SaveSharedScheduleDto dto) {
        return ResponseEntity.ok(shareScheduleService.saveShareSchedule(request, dto));
    }
}
