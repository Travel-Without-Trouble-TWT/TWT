package com.BE.TWT.exception.error;

import com.BE.TWT.exception.message.PlaceErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlaceException extends RuntimeException{
    private final PlaceErrorMessage placeErrorMessage;
}
