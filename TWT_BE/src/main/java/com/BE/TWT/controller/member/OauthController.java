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
import java.io.IOException;

@RestController
@RequestMapping(value = "/oauth")
@RequiredArgsConstructor
@Api(tags = "소셜 로그인 API")
public class OauthController {

    private final CustomOauth2Service customOauth2Service;

    @ApiOperation(value = "구글 소셜 로그인")
    @Operation(description = "Oauth2 Login API")
    @GetMapping("/google")
    public ResponseEntity<String> googleLogin(@RequestParam @Valid String token, HttpServletResponse response) throws IOException {
        return ResponseEntity.ok(customOauth2Service.signInMemberUseGoogleToken(token, response));
    }
}