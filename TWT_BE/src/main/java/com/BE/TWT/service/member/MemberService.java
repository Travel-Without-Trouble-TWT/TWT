package com.BE.TWT.service.member;

import com.BE.TWT.config.CookieProvider;
import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.dto.member.*;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.service.function.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import static com.BE.TWT.exception.message.MemberErrorMessage.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final S3Service s3Service;
    private final CookieProvider cookieProvider;

    public Member signUp (SignUpDto signUpDto) {
        if (memberRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
            throw new MemberException(ALREADY_REGISTERED);
        }

        if (memberRepository.findByEmail(signUpDto.getNickName()).isPresent()) {
            throw new MemberException(DUPLICATED_NICKNAME);
        }

        Member member = Member.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .nickName(signUpDto.getNickName())
                .isGoogleLogin(0)
                .build();
        return memberRepository.save(member);
    }

    public String signIn (SignInDto signInDto, HttpServletResponse response) {
        Member member = memberRepository.findByEmail(signInDto.getEmail())
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        if(!passwordEncoder.matches(signInDto.getPassword(), member.getPassword())) {
            throw new MemberException(MISMATCH_PASSWORD);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInDto.getEmail(), signInDto.getPassword()));

        String accessToken = jwtTokenProvider.generateAccessToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(authentication);
        cookieProvider.setRefreshTokenCookie(refreshToken, response);

        return accessToken;
    }

    public String checkDuplicateNickName(String nickName) { // 닉네임 중복 검사 이미 존재하는 닉네임일 경우 exception 발생
        if (memberRepository.findByNickName(nickName).isPresent()) {
            throw new MemberException(DUPLICATED_NICKNAME);
        } else {
            return "message: 사용 가능한 닉네임입니다.";
        }
    }

    public void updateNickName(HttpServletRequest request, String nickName) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        if (memberRepository.findByNickName(nickName).isPresent()) {
            throw new MemberException(DUPLICATED_NICKNAME);
        }

        member.update(nickName);
    }

    public void updateUserPhoto(HttpServletRequest request, MultipartFile file) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        String photoUrl = s3Service.uploadFile(file);

        member.updateProfileUrl(photoUrl);
    }

    public InfoResponseDto searchMemberInfo (HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        return InfoResponseDto.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .nickName(member.getNickName())
                .profileUrl(member.getProfileUrl())
                .build();
    }

    public void logOut(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        String refreshToken = "";
        if (cookies != null) {
            for (int i = 0; i < cookies.length; i++) {
                Cookie cookie = cookies[i];
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (!jwtTokenProvider.validateRefreshToken(refreshToken)) {
            throw new MemberException(INVALID_TOKEN);
        }

        cookieProvider.deleteRefreshTokenCookie(response);
    }

    public String getAccessTokenByRefreshToken(String refreshToken) {
        if(!jwtTokenProvider.validateRefreshToken(refreshToken)) {
            throw new MemberException(INVALID_TOKEN);
        }

        String email = jwtTokenProvider.getPayloadSub(refreshToken);
        Member member = memberRepository.findByEmail(email).get();
        String password = member.getPassword();

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(member, password));

        return jwtTokenProvider.generateAccessToken(authentication);
    }

    public String changePassword(HttpServletRequest request, String password) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        member.setPassword(passwordEncoder.encode(password));

        memberRepository.save(member);
        return "비밀번호가 변경되었습니다.";
    }
}
