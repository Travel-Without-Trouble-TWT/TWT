package com.BE.TWT.exception.response;

import com.BE.TWT.exception.message.ReviewErrorMessage;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ReviewErrorResponse {
    private final int status;
    private final String error;
    private final String code;
    private final String message;

    public static ResponseEntity<ReviewErrorResponse> toResponseEntity(ReviewErrorMessage errorMessage) {
        return ResponseEntity.status(errorMessage.getStatus())
                .body(ReviewErrorResponse.builder()
                        .status(errorMessage.getStatus().value())
                        .error(errorMessage.getStatus().name())
                        .code(errorMessage.name())
                        .message(errorMessage.getErrorMessage())
                        .build());
    }
}