package com.BE.TWT.model.dto;

import com.BE.TWT.model.type.BuildType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponse {
    private String address;
    private double longitude; // x
    private double latitude; // y
    private String phone;
    @Enumerated(EnumType.STRING)
    private BuildType buildType;
}
