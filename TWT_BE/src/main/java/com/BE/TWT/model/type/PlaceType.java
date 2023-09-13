package com.BE.TWT.model.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaceType {
    HOT_PLACE("명소"), STAY("숙소"), RESTAURANT("맛집");

    private final String place;
}
