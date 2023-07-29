package com.BE.TWT.exception.error;

import com.BE.TWT.exception.message.MapErrorMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.IOException;

@Getter
@AllArgsConstructor
public class MapException extends IOException {
    private final MapErrorMessage mapErrorMessage;
}
