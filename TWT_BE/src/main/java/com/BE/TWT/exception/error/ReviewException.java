package com.BE.TWT.exception.error;

import com.BE.TWT.exception.message.ReviewErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReviewException extends RuntimeException{
    private final ReviewErrorMessage reviewErrorMessage;
}

