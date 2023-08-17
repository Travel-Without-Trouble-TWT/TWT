package com.BE.TWT.service.member;

import com.BE.TWT.model.dto.member.SignInDto;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.repository.member.MemberRepository;
import com.google.gson.JsonParser;
import com.google.gson.JsonElement;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomOauth2Service {
    private final String GOOGLE_TOKEN_URL = "http://oauth2.googleapis.com/token";

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

    public String getGoogleToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();

        params.put("code", code);
        params.put("client_id", CLIENT_ID);
        params.put("client_secret", CLIENT_SECRET);
        params.put("redirect_url", REDIRECT_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(GOOGLE_TOKEN_URL, params, String.class);

        String jsonBody = responseEntity.getBody();

        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(jsonBody);

        String accessToken = element.getAsJsonObject().get("access_token").getAsString();

        return useTokenGetMember(accessToken);
    }

    public String useTokenGetMember(String token) {
        try {
            URL url = new URL(getMemberInfoUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result);

            String email = element.getAsJsonObject().get("email").getAsString();
            String name = element.getAsJsonObject().get("name").getAsString();

            if (memberRepository.findByEmail(email).isEmpty()) {
                saveMember(email, name);
            }

            SignInDto signInDto = SignInDto.builder()
                    .email(email)
                    .password(name)
                    .build();

            String accessToken = memberService.signIn(signInDto);

            br.close();

            return accessToken;

        }  catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public Member saveMember(String email, String name) {
        Member member = Member.builder()
                .nickName(name)
                .email(email)
                .password(passwordEncoder.encode(name))
                .build();
        return memberRepository.save(member);
    }

}
