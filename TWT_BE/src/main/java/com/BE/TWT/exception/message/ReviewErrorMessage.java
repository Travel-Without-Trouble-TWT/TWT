package com.BE.TWT.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ReviewErrorMessage {
    NOT_REGISTERED_REVIEW(HttpStatus.BAD_REQUEST, "등록되지 않은 리뷰입니다."),
    UNMATCHED_USER(HttpStatus.BAD_REQUEST, "유저 정보가 일치하지 않습니다.")
    ;

    private final HttpStatus status;
    private final String errorMessage;
}
