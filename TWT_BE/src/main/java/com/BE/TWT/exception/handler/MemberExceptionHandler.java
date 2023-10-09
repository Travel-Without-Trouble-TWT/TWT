package com.BE.TWT.exception.handler;

import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.response.MemberErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MemberExceptionHandler {
    @ExceptionHandler(MemberException.class)
    public ResponseEntity<MemberErrorResponse> handleMemberException(MemberException e) {
        return MemberErrorResponse.toResponseEntity(e.getMemberErrorMessage());
    }
}
