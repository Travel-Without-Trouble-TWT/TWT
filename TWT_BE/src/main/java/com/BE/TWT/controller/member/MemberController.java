package com.BE.TWT.controller.member;

import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.dto.member.SignUpDto;
import com.BE.TWT.model.dto.member.UpdateDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Api(tags = "유저 API")
public class MemberController {
    private final MemberService memberService;

    @ApiOperation(value = "회원가입")
    @Operation(description = "이메일, 닉네임은 중복이 불가합니다.")
    @PostMapping("/join")
    public ResponseEntity<Member> signUp(@RequestBody @Valid SignUpDto signUpDto) {
        return ResponseEntity.ok(memberService.signUp(signUpDto));
    }

    @ApiOperation(value = "로그인")
    @Operation(description = "JWT 토큰 발급 후 저장해주세요 ^^7")
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid SignInDto signInDto) {
        return ResponseEntity.ok(memberService.signIn(signInDto));
    }

    @ApiOperation(value = "닉네임 변경")
    @Operation(description = "닉네임 중복 시 에러 떠요!!")
    @PutMapping("/edit")
    public void updateNickname (HttpServletRequest request, @RequestBody @Valid UpdateDto updateDto) {
        memberService.updateNickname(request, updateDto);
    }
}
