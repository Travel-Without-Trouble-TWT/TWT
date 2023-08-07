package com.BE.TWT.model.dto.member;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignInDto {
    @ApiModelProperty(example = "이메일", required = true)
    private String email;
    @ApiModelProperty(example = "비밀번호", required = true)
    private String password;
}
