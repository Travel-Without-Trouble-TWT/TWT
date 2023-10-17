package com.BE.TWT.config;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Component
public class CookieProvider {

    private final String refreshTokenName = "refreshToken";
    private final String accessTokenName = "accessToken";
    private final long refreshTokenExpiration = 2 * 24 * 60 * 60;


    public void setRefreshTokenCookie(String refreshToken, HttpServletResponse response) {
        Cookie cookie = new Cookie(refreshTokenName, refreshToken);
        cookie.setMaxAge((int)refreshTokenExpiration);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public void deleteRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(refreshTokenName, null);
        cookie.setMaxAge(0); // 즉시 만료
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
}