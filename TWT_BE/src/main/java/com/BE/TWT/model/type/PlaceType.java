package com.BE.TWT.model.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaceType {
    HOT_PLACE("명소"), STAY("숙소"), RESTAURANT("식당");

    private final String place;
}
