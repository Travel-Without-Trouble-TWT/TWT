package com.BE.TWT.model.entity.location;

import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.model.type.PlaceType;
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
    private String placeImageUrl;
    private String placeDescription;
    private int placeHeart;

    private double totalStar;
    private double star;
    private String placeCallNumber;
    @Enumerated(EnumType.STRING)
    private PlaceType placeType;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private List<Review> reviewList;

    public void plusHeart() {
        placeHeart++;
    }

    public void minusHeart() {
        placeHeart--;
    }

    public void updateAverageRating(double newStar) {
        this.totalStar += newStar;
        int size = reviewList.size();
        star = totalStar / size;
    }
}
