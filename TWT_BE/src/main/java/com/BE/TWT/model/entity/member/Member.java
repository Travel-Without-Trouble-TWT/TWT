package com.BE.TWT.model.entity.member;

import com.BE.TWT.model.entity.function.Heart;
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
    private String profileUrl;
//    @JsonIgnore
//    private List<Schedule> scheduleList;
//    @JsonIgnore
//    private List<Review> reviewList;

    public void update(String nickname) {
        this.nickname = nickname;
    }

}
