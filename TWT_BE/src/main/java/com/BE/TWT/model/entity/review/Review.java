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
import java.time.LocalDateTime;
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
    private LocalDateTime createAt;
    @Column(nullable = false)
    private double star;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "place_id", referencedColumnName = "id")
    private Place place;
    @ElementCollection
    @CollectionTable(name = "review_image_list", joinColumns = @JoinColumn(name = "review_id", referencedColumnName = "id"))
    private List<String> reviewImageList;
    @Column(nullable = false)
    private Long memberId;
    @Column(nullable = false)
    private String reviewComment;
}
