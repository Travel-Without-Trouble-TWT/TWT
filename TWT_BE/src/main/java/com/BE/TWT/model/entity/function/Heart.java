package com.BE.TWT.model.entity.function;

import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.type.PlaceType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Heart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
    @Column(nullable = false)
    private PlaceType placeType;
    @Column(nullable = false)
    private String placeName;
}
