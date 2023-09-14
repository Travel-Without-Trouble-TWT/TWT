package com.BE.TWT.exception.response;

import com.BE.TWT.exception.message.ScheduleErrorMessage;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ScheduleErrorResponse {
    private final int status;
    private final String error;
    private final String code;
    private final String message;

    public static ResponseEntity<ScheduleErrorResponse> toResponseEntity(ScheduleErrorMessage errorMessage) {
        return ResponseEntity.status(errorMessage.getStatus())
                .body(ScheduleErrorResponse.builder()
                        .status(errorMessage.getStatus().value())
                        .error(errorMessage.getStatus().name())
                        .code(errorMessage.name())
                        .message(errorMessage.getErrorMessage())
                        .build());
    }
}