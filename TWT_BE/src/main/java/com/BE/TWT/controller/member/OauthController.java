package com.BE.TWT.controller.member;

import com.BE.TWT.service.member.CustomOauth2Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/login/oauth2")
@RequiredArgsConstructor
@Api(tags = "소셜 로그인 API")
public class OauthController {

    private final CustomOauth2Service customOauth2Service;

    @ApiOperation(value = "구글 소셜 로그인")
    @Operation(description = "Oauth2 Login API")
    @GetMapping("/code/google")
    public ResponseEntity<?> googleLogin(@RequestParam @Valid String code, HttpServletResponse response) {
        return ResponseEntity.ok(customOauth2Service.getGoogleToken(code, response));
    }
}