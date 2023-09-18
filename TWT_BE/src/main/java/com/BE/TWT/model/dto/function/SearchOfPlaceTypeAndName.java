package com.BE.TWT.model.dto.function;

import com.BE.TWT.model.type.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchOfPlaceTypeAndName {
    private PlaceType placeType;
    private String placeName;
}
