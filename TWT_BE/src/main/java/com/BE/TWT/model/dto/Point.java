package com.BE.TWT.model.dto;

import lombok.Getter;

@Getter
public class Point {
    private double latitude;
    private double longitude;

    public Point(double latitude, double longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
