package com.BE.TWT.config;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Component
public class CookieProvider {

    private final String refreshTokenName = "refreshToken";
    private final String accessTokenName = "accessToken";
    private final long refreshTokenExpiration = 2 * 24 * 60 * 60 * 1000L;
    private final long accessTokenExpiration = 1000L * 60 * 60 * 6;

    public void setAccessTokenCookie(String accessToken, HttpServletResponse response) {
        Cookie cookie = new Cookie(accessTokenName, accessToken);
        cookie.setMaxAge((int)accessTokenExpiration);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

    public void deleteAccessTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(accessTokenName, null);
        cookie.setMaxAge(0); // 즉시 만료
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }

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