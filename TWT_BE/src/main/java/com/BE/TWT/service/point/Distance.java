package com.BE.TWT.service.point;

public class Distance {
    public double getDistance(double lat1, double lon1, double lat2, double lon2) {

        // 지구의 반지름 (km)
        double R = 6371.0;

        // 두 점의 위도와 경도 차이
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        // 두 점 사이의 거리
        double d = R * Math.acos(Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2));

        return d;
    }
}
