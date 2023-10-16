package com.BE.TWT.controller.member;

import com.BE.TWT.model.dto.member.InfoResponseDto;
import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.dto.member.SignUpDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.service.function.EmailVerification;
import com.BE.TWT.service.function.HeartService;
import com.BE.TWT.service.function.WithDraw;
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
    private final HeartService heartService;
    private final WithDraw withDraw;

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
    public ResponseEntity<InfoResponseDto> searchMember(HttpServletRequest request) {
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
    @GetMapping("/refresh")
    public String getAccessToken(@RequestParam @Valid String refreshToken) {
        return memberService.getAccessTokenByRefreshToken(refreshToken);
    }

    @ApiOperation(value = "이메일 중복 확인 + 인증 코드 전송")
    @Operation(description = "String 리턴으로 중복 확인만 함")
    @GetMapping("/verify")
    public String checkEmail(@RequestParam @Valid String email) {
        return emailVerification.sendMail(email);
    }

    @ApiOperation(value = "닉네임 중복 확인")
    @Operation(description = "닉네임 중복 검사 API")
    @GetMapping("/nick")
    public String checkNickName(@RequestParam @Valid String nickName) {
        return memberService.checkDuplicateNickName(nickName);
    }

    @ApiOperation(value = "좋아요 버튼")
    @Operation(description = "좋아요를 이미 눌렀었던 유저 & 게시글은 좋아요 취소가 됩니다.")
    @PostMapping
    public ResponseEntity<?> likeIt(HttpServletRequest request, @RequestParam @Valid Long placeId) {
        return ResponseEntity.ok(heartService.likeIt(request, placeId));
    }

    @ApiOperation(value = "비밀번호 변경")
    @Operation(description = "비밀번호 값만 바꾸는 API")
    @PutMapping("/password")
    public String changePassword(HttpServletRequest request, @RequestParam @Valid String password) {
        return memberService.changePassword(request, password);
    }

    @ApiOperation(value = "회원 탈퇴")
    @Operation(description = "스케줄, 리뷰, 좋아요 모두 삭제됩니다")
    @DeleteMapping("/bye")
    public String withDrawMember(HttpServletRequest request, HttpServletResponse response) {
        return withDraw.withDrawMember(request, response);
    }
}
