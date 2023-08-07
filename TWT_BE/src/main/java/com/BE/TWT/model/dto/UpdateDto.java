package com.BE.TWT.model.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateDto {
    @ApiModelProperty(example = "유저ID", required = true)
    @Column(nullable = false, unique = true)
    private Long id;
    @ApiModelProperty(example = "닉네임", required = true)
    @Column(nullable = false, unique = true)
    private String nickname;
}
