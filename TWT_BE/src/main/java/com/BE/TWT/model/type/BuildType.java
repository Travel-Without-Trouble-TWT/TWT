package com.BE.TWT.model.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BuildType {
    CAFE("카페"), RESTAURANT("식당"), PLACE("명소") ;

    private final String place;
}
