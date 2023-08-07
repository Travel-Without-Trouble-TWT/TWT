package com.BE.TWT.model.entity.location;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String placeName;
    @Column(nullable = false)
    private String placeLocation;
    @Column(nullable = false)
    private String placeAddress;
    @Column(nullable = false)
    private double latitude;
    @Column(nullable = false)
    private double longitude;
    private int placeHeart;
    private double placeStar;
    private String placeCallNumber;
//    private List<Review> reviewList;

    public void plusHeart() {
        placeHeart++;
    }

    public void minusHeart() {
        placeHeart--;
    }
}
