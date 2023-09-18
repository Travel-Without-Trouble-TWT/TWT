package com.BE.TWT.controller.function;

import com.BE.TWT.service.function.EmailVerification;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/verify")
public class EmailVerificationController {
    private final EmailVerification emailVerification;

    @GetMapping("/code")
    public String verificationCode(@RequestParam @Valid String verificationCode) {
        return emailVerification.verificationCode(verificationCode);
    }
}
