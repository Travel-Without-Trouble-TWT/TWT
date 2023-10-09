package com.BE.TWT.exception.handler;

import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.exception.response.ScheduleErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ScheduleExceptionHandler {
    @ExceptionHandler(ScheduleException.class)
    public ResponseEntity<ScheduleErrorResponse> handleScheduleException(ScheduleException e) {
        return ScheduleErrorResponse.toResponseEntity(e.getScheduleErrorMessage());
    }
}
