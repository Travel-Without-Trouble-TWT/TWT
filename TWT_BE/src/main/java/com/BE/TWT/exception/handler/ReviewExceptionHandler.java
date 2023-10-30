package com.BE.TWT.exception.handler;

import com.BE.TWT.exception.error.ReviewException;
import com.BE.TWT.exception.response.ReviewErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ReviewExceptionHandler {
    @ExceptionHandler(ReviewException.class)
    public ResponseEntity<ReviewErrorResponse> handleReviewException(ReviewException e) {
        return ReviewErrorResponse.toResponseEntity(e.getReviewErrorMessage());
    }
}