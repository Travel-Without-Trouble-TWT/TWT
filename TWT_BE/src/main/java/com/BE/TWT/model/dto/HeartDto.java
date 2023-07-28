package com.BE.TWT.model.dto;

import com.BE.TWT.model.type.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HeartDto {
    private Long memberId;
    private PlaceType placeType;
    private String placeName;
}
