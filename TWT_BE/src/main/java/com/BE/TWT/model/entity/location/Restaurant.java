package com.BE.TWT.model.entity.location;

import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.model.type.BuildType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String restaurantName;
    @Column(nullable = false)
    private String restaurantLocation; // 필터용 지역
    @Column(nullable = false)
    private String restaurantAddress; // 숙소 상세주소
    private double latitude;
    private double longitude;
    @Column(nullable = false)
    private String restaurantImageUrl;
    @Column(nullable = false)
    private String restaurantDescription;
    private String restaurantCallNumber;
    @Enumerated(EnumType.STRING)
    private BuildType buildType;

    private int restaurantLove; // 좋아요

    private double star; // 별점

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;
}
