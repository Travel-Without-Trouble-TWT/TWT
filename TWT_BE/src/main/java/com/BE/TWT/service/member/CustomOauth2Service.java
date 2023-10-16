package com.BE.TWT.service.member;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.repository.member.MemberRepository;
import com.nimbusds.jose.shaded.json.JSONObject;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;

import static com.BE.TWT.exception.message.MemberErrorMessage.*;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomOauth2Service {
    private final JwtTokenProvider jwtTokenProvider;
    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com";
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String CLIENT_SECRET;
    @Value("${spring.security.oauth2.client.registration.google.redirect.url}")
    private String REDIRECT_URL;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final String getMemberInfoUrl = "https://www.googleapis.com/userinfo/v2/me";


    public String signInMemberUseGoogleToken(String token, HttpServletResponse response) throws MemberException {

        RestTemplate restTemplate = new RestTemplate();
        String requestUrl = UriComponentsBuilder.fromHttpUrl(GOOGLE_TOKEN_URL + "/tokeninfo").queryParam("id_token", token).toUriString();

        JSONObject resultJson = restTemplate.getForObject(requestUrl, JSONObject.class);

        String email = "";
        String name = "";
        String picture = "";

        if (resultJson != null) {

            email = resultJson.get("email").toString();
            name = resultJson.get("name").toString();
            picture = resultJson.get("picture").toString();

        } else {
            throw new MemberException(USER_NOT_FOUND);
        }

        if (memberRepository.findByEmail(email).isEmpty()) {
            saveMember(email, name, picture);
        }

        SignInDto signInDto = SignInDto.builder()
                .email(email)
                .password(name)
                .build();

        return memberService.signIn(signInDto, response);
    }

    public Member saveMember(String email, String name, String picture) {
        Member member = Member.builder()
                .nickName(name)
                .email(email)
                .password(passwordEncoder.encode(name))
                .isGoogleLogin(1)
                .profileUrl(picture)
                .build();
        return memberRepository.save(member);
    }
}
