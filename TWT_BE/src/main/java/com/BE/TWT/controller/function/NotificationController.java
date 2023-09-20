package com.BE.TWT.controller.function;

import com.BE.TWT.model.entity.function.Notification;
import com.BE.TWT.service.function.ScheduleNotification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;


@Api(tags = "SSE 알림 API")
@RestController
@RequestMapping("/emitter")
@RequiredArgsConstructor
public class NotificationController {
    private final ScheduleNotification scheduleNotification;

    @CrossOrigin
    @ApiOperation(value = "알림 SSE 구독")
    @Operation(description = "유저가 로그인했을 때 같이 실행해줘야해요!")
    @GetMapping(value = "/sub", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(HttpServletRequest request) {
        return scheduleNotification.subscribeSse(request);
    }

    @ApiOperation(value = "알림 전체 불러오기")
    @Operation(description = "유저아이디에 날아온 알림들을 모두 보여줍니다.")
    @GetMapping(value = "/all")
    public ResponseEntity<List<Notification>> findAllNotification(HttpServletRequest request) {
        return ResponseEntity.ok(scheduleNotification.findAllNotificationByMember(request));
    }

    @ApiOperation(value = "알림 상세보기")
    @Operation(description = "알림 하나의 메시지를 읽을 때")
    @GetMapping(value = "/read")
    public ResponseEntity<Notification> readNotification(@RequestParam @Valid Long notificationId) {
        return ResponseEntity.ok(scheduleNotification.readNotification(notificationId));
    }

    @ApiOperation(value = "알림 상세보기")
    @Operation(description = "알림 하나의 메시지를 읽을 때")
    @DeleteMapping(value = "/checked")
    public void deleteNotification(@RequestParam @Valid Long notificationId) {
       scheduleNotification.deleteNotification(notificationId);
    }
}
