package com.BE.TWT.model.entity.member;

import com.BE.TWT.model.entity.function.Notification;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.model.entity.schedule.Schedule;
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
    private String nickName;
    private String profileUrl;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Notification> notificationList;

    public void update(String nickname) {
        this.nickName = nickname;
    }

    public void updateProfileUrl(String url) {
        this.profileUrl = url;
    }
}
