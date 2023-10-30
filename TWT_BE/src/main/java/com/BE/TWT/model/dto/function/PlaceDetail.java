package com.BE.TWT.model.dto.function;

import com.BE.TWT.model.type.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceDetail {
    private Long id;
    private String placeName;
    private String placeLocation;
    private String placeAddress;
    private double latitude;
    private double longitude;
    private String placeImageUrl;
    private String placeDescription;
    private int placeHeart;
    private int reviewNum;
    private double totalStar;
    private double star;
    private String placeCallNumber;
    private PlaceType placeType;
    private boolean likeIt;
}
