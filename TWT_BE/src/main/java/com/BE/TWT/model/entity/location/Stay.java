package com.BE.TWT.model.entity.location;

import com.BE.TWT.model.type.PlaceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Stay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String stayName;
    @Column(nullable = false)
    private String stayLocation; // 필터용 지역
    @Column(nullable = false)
    private String stayAddress; // 숙소 상세주소
    private double latitude;
    private double longitude;
    @Column(nullable = false)
    private String stayImageUrl;
    @Column(nullable = false)
    private String stayDescription;

    private int stayHeart; // 좋아요

    private double star; // 별점

    private String stayCallNumber;

    @Enumerated(EnumType.STRING)
    private PlaceType placeType;

//    private List<Review> reviewList;

    public void plusHeart() {
        stayHeart++;
    }

    public void minusHeart() {
        stayHeart--;
    }
}
