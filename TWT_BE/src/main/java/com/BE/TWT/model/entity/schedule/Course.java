package com.BE.TWT.model.entity.schedule;

import com.BE.TWT.model.type.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@Builder
public class Course {
    private String placeName; // 장소 이름
    private PlaceType placeType;
    private LocalDateTime arriveAt; // 도착 시간
    private double longitude;
    private double latitude;
    private double distance; // 다음 여행지까지 거리

    public void setTime(LocalDateTime time) {
        this.arriveAt = time;
    }

    public void calculateDistance(double x1, double y1, double x2, double y2) {
        double radius = 6371; // 지구 반지름(km)
        double toRadian = Math.PI / 180;

        double deltaLatitude = Math.abs(x1 - x2) * toRadian;
        double deltaLongitude = Math.abs(y1 - y2) * toRadian;

        double sinDeltaLat = Math.sin(deltaLatitude / 2);
        double sinDeltaLng = Math.sin(deltaLongitude / 2);
        double squareRoot = Math.sqrt(
                sinDeltaLat * sinDeltaLat +
                        Math.cos(x1 * toRadian) * Math.cos(x2 * toRadian) * sinDeltaLng * sinDeltaLng);

        this.distance = 2 * radius * Math.asin(squareRoot);
    }
}
