package com.BE.TWT.model.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InfoResponseDto {
    private String email;
    private String nickName;
    private String profileUrl;
}
