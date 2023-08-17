package com.BE.TWT.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ScheduleErrorMessage {
    NOT_REGISTERED_SCHEDULE(HttpStatus.BAD_REQUEST, "등록되지 않은 스케줄입니다."),
    UNAUTHORIZED_REQUEST(HttpStatus.BAD_REQUEST, "권한이 없습니다.")
    ;


    private final HttpStatus status;
    private final String errorMessage;
}
