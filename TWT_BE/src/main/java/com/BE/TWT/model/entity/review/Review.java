package com.BE.TWT.model.entity.review;

import com.BE.TWT.model.entity.function.ReviewImage;
import com.BE.TWT.model.entity.location.Place;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @CreatedDate
    @Column(updatable = false)
    private LocalDate createAt;
    @Column(nullable = false)
    private double star;
    @ManyToOne
    @JoinColumn(name = "place_id", referencedColumnName = "id")
    private Place place;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "placeReview_id")
    private List<ReviewImage> reviewImageList;
    @Column(nullable = false)
    private Long memberId;
    @Column(nullable = false)
    private String reviewComment;


    @PrePersist
    public void plusStar() {
        // 리뷰를 작성할 때 업체에 평균 평점을 자동으로 계산하여 설정
        place.updateAverageRating(star);
    }
}
