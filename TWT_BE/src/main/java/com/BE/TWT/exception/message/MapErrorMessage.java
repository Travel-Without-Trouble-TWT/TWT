package com.BE.TWT.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MapErrorMessage {
    INVALID_ADDRESS(HttpStatus.BAD_REQUEST, "올바르지 않은 주소입니다.")
    ;

    private final HttpStatus status;
    private final String errorMessage;
}
