package com.BE.TWT.controller.member;

import com.BE.TWT.model.dto.member.InfoResponseDto;
import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.dto.member.SignUpDto;
import com.BE.TWT.model.dto.member.UpdateDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.service.function.EmailVerification;
import com.BE.TWT.service.member.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
@Api(tags = "유저 API")
public class MemberController {
    private final MemberService memberService;
    private final EmailVerification emailVerification;

    @ApiOperation(value = "회원가입")
    @Operation(description = "이메일, 닉네임은 중복이 불가합니다.")
    @PostMapping("/join")
    public ResponseEntity<Member> signUp(@RequestBody @Valid SignUpDto signUpDto) {
        return ResponseEntity.ok(memberService.signUp(signUpDto));
    }

    @ApiOperation(value = "로그인")
    @Operation(description = "토큰 발급 후 저장해주세요 ^^7")
    @PostMapping("/login")
    public ResponseEntity<?> signIn(@RequestBody @Valid SignInDto signInDto, HttpServletResponse response) {
        return ResponseEntity.ok(memberService.signIn(signInDto, response));
    }

    @ApiOperation(value = "닉네임 변경")
    @Operation(description = "닉네임 중복 시 에러 떠요!!")
    @PutMapping("/edit")
    public void updateNickName (HttpServletRequest request, @RequestParam @Valid String nickName) {
        memberService.updateNickName(request, nickName);
    }

    @ApiOperation(value = "프사 변경")
    @Operation(description = "사진 안넣었을 때 기본 사진 부탁해요~")
    @PutMapping("/profile")
    public void updateProfileUrl (HttpServletRequest request,
                                  @RequestPart(value = "file", required = false) MultipartFile file) {
        memberService.updateUserPhoto(request, file);
    }

    @ApiOperation(value = "유저 조회")
    @Operation(description = "마이 프로필 클릭했을 때 필요로 하는 값")
    @GetMapping("/info")
    public ResponseEntity<InfoResponseDto> searchMember (HttpServletRequest request) {
        return ResponseEntity.ok(memberService.searchMemberInfo(request));
    }

    @ApiOperation(value = "유저 로그아웃")
    @Operation(description = "서버에서는 쿠키만 삭제됩니다 !")
    @PostMapping("/logout")
    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        memberService.logOut(request, response);
    }

    @ApiOperation(value = "토큰 재발급")
    @Operation(description = "쿠키 내에 Refresh Token 을 입력해주세요")
    @GetMapping("/logout")
    public String logOut(@RequestParam @Valid String refreshToken) {
        return memberService.getAccessTokenByRefreshToken(refreshToken);
    }

    @ApiOperation(value = "이메일 중복 확인 + 인증 코드 전송")
    @Operation(description = "String 리턴으로 중복 확인만 함")
    @GetMapping("/verify")
    public String checkEmail(@RequestParam @Valid String email) {
        return emailVerification.sendMail(email);
    }
}
