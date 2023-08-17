package com.BE.TWT.service.member;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.dto.member.SignUpDto;
import com.BE.TWT.model.dto.member.UpdateDto;
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

import javax.servlet.http.HttpServletRequest;

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
                .build();
        return memberRepository.save(member);
    }

    public String signIn (SignInDto signInDto) {
        Member member = memberRepository.findByEmail(signInDto.getEmail())
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        if(!passwordEncoder.matches(signInDto.getPassword(), member.getPassword())) {
            throw new MemberException(MISMATCH_PASSWORD);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInDto.getEmail(), signInDto.getPassword()));

        return jwtTokenProvider.generateAccessToken(authentication);
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
}
