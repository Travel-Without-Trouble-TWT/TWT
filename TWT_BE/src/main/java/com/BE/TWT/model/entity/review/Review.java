package com.BE.TWT.model.entity.review;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
    @Column(updatable = false)
    private LocalDateTime createAt;
    @Column(nullable = false)
    private double star;
    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;
    @ElementCollection
    @CollectionTable(name = "review_image_list", joinColumns = @JoinColumn(name = "review_id", referencedColumnName = "id"))
    private List<String> reviewImageList;
    @Column(nullable = false)
    private String reviewComment;
    @Column(nullable = false)
    private String nickName; // 작성자
    private String memberProfileUrl; // 작성자 프사
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
