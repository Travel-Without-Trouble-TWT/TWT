package com.BE.TWT.controller.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.service.function.ScheduleNotification;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;


@RestController
@RequestMapping("/emitter")
@RequiredArgsConstructor
public class NotificationController {
    private final ScheduleNotification scheduleNotification;

    @CrossOrigin
    @GetMapping(value = "/sub", consumes = MediaType.ALL_VALUE)
    public SseEmitter subscribe(HttpServletRequest request) {
        return scheduleNotification.subscribeSse(request);
    }
}
