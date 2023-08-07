package com.BE.TWT.exception.message;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorMessage {
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "찾을 수 없는 회원입니다."),
    MISMATCH_PASSWORD(HttpStatus.UNAUTHORIZED, "비밀번호가 일치하지 않습니다."),
    UNAUTHORIZED_USER(HttpStatus.BAD_GATEWAY, "로그인이 필요합니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "인가되지 않은 토큰입니다."),
    ALREADY_REGISTERED(HttpStatus.BAD_REQUEST, "이미 존재하는 아이디입니다."),
    DUPLICATED_NICKNAME(HttpStatus.BAD_REQUEST, "해당 닉네임은 이미 사용 중입니다."),
            ;

    private final HttpStatus status;
    private final String errorMessage;
}
