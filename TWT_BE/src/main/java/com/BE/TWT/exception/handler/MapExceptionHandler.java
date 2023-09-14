package com.BE.TWT.exception.handler;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.exception.response.MapErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class MapExceptionHandler {
    @ExceptionHandler(MapException.class)
    public ResponseEntity<MapErrorResponse> handleMapException(MapException e) {
        return MapErrorResponse.toResponseEntity(e.getMapErrorMessage());
    }
}