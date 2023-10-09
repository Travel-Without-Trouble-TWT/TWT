package com.BE.TWT.exception.handler;

import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.response.PlaceErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PlaceExceptionHandler {
    @ExceptionHandler(PlaceException.class)
    public ResponseEntity<PlaceErrorResponse> handlePlaceException(PlaceException e) {
        return PlaceErrorResponse.toResponseEntity(e.getPlaceErrorMessage());
    }
}

