package com.BE.TWT.model.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PlaceType {
    HOT_PLACE("HOT_PLACE"), STAY("STAY"), RESTAURANT("RESTAURANT"), ALL("ALL");

    private final String place;
}
