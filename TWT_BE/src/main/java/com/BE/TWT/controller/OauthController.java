package com.BE.TWT.controller;

import com.BE.TWT.service.member.CustomOauth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/login/oauth2")
@RequiredArgsConstructor
public class OauthController {

    private final CustomOauth2Service customOauth2Service;

    @GetMapping("/code/google")
    public ResponseEntity<?> googleLogin(@RequestParam @Valid String token) {
        return ResponseEntity.ok(customOauth2Service.getGoogleToken(token));
    }
}