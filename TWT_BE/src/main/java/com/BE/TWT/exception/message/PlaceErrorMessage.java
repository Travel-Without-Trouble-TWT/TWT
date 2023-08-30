package com.BE.TWT.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum PlaceErrorMessage {
    WRONG_ADDRESS(HttpStatus.BAD_REQUEST, "찾을 수 없는 장소입니다."),
    UNDEFINED_REVIEW(HttpStatus.BAD_REQUEST, "찾을 수 없는 리뷰입니다.")
    ;

    private final HttpStatus status;
    private final String errorMessage;
}
