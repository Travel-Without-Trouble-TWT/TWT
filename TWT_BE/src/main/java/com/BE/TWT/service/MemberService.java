package com.BE.TWT.service;

import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.dto.SignInDto;
import com.BE.TWT.model.dto.SignUpDto;
import com.BE.TWT.model.entity.Member;
import com.BE.TWT.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.BE.TWT.exception.message.MemberErrorMessage.*;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member signUp (SignUpDto signUpDto) {
        if (memberRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
            throw new MemberException(ALREADY_REGISTERED);
        }
        if (memberRepository.findByEmail(signUpDto.getNickname()).isPresent()) {
            throw new MemberException(DUPLICATED_NICKNAME);
        }

        Member member = Member.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .nickname(signUpDto.getNickname())
                .build();
        return memberRepository.save(member);
    }

    public String signIn (SignInDto signInDto) {
        Member member = memberRepository.findByEmail(signInDto.getEmail())
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        if(!passwordEncoder.matches(signInDto.getPassword(), member.getPassword())) {
            throw new MemberException(MISMATCH_PASSWORD);
        }

        return "Success";
    }
}
