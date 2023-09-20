package com.BE.TWT.controller.function;

import com.BE.TWT.service.function.EmailVerification;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Api(tags = "이메일 인증 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/verify")
public class EmailVerificationController {
    private final EmailVerification emailVerification;

    @ApiOperation(value = "이메일 인증")
    @Operation(description = "이메일로 전송된 코드 일치 여부 확인 바랍니다.")
    @GetMapping("/code")
    public String verificationCode(@RequestParam @Valid String verificationCode) {
        return emailVerification.verificationCode(verificationCode);
    }
}
