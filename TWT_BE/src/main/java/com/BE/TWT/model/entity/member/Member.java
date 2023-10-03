package com.BE.TWT.model.entity.member;

import lombok.*;

import javax.persistence.*;

@Setter
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
    private int isGoogleLogin; // 1 = 홈페이지 회원가입 , 0 = 구글 소셜 로그인

    public void update(String nickname) {
        this.nickName = nickname;
    }

    public void updateProfileUrl(String url) {
        this.profileUrl = url;
    }
}
