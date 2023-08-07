package com.BE.TWT.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(unique = true, nullable = false)
    private String nickname;
//    @JsonIgnore
//    private List<Schedule> scheduleList;
//    @JsonIgnore
//    private List<Review> reviewList;
//    @JsonIgnore
//    private List<Like> likeList;

    public void update(String nickname) {
        this.nickname = nickname;
    }
}
