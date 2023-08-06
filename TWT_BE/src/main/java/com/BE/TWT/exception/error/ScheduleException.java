package com.BE.TWT.exception.error;

import com.BE.TWT.exception.message.ScheduleErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ScheduleException extends RuntimeException{
    private final ScheduleErrorMessage scheduleErrorMessage;
}
