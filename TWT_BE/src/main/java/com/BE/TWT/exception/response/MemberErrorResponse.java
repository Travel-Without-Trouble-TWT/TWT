package com.BE.TWT.exception.response;

import com.BE.TWT.exception.message.MemberErrorMessage;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class MemberErrorResponse {
    private final int status;
    private final String error;
    private final String code;
    private final String message;

    public static ResponseEntity<MemberErrorResponse> toResponseEntity(MemberErrorMessage errorMessage) {
        return ResponseEntity.status(errorMessage.getStatus())
                .body(MemberErrorResponse.builder()
                        .status(errorMessage.getStatus().value())
                        .error(errorMessage.getStatus().name())
                        .code(errorMessage.name())
                        .message(errorMessage.getErrorMessage())
                        .build());
    }
}
