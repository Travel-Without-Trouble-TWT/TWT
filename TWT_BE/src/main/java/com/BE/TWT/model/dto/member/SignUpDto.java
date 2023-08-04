package com.BE.TWT.model.dto.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SignUpDto {
    @ApiModelProperty(example = "이메일", required = true)
    @Column(nullable = false, unique = true)
    private String email;
    @ApiModelProperty(example = "비밀번호", required = true)
    @Column(nullable = false)
    private String password;
    @ApiModelProperty(example = "닉네임", required = true)
    @Column(nullable = false, unique = true)
    private String nickname;
}
