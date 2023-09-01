package com.BE.TWT.model.entity.function;

import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.type.PlaceType;
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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member; // Token 에서 userId 값 빼내서 채우기
    @Enumerated(EnumType.STRING)
    private PlaceType placeType;
    @Column(nullable = false)
    private String placeName;
}