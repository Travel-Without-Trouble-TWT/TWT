package com.BE.TWT.exception.error;

import com.BE.TWT.exception.message.MemberErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberException extends RuntimeException{
    private final MemberErrorMessage memberErrorMessage;
}
