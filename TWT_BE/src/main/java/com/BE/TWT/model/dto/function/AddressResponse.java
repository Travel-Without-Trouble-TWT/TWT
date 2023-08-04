package com.BE.TWT.model.dto.function;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressResponse {
    private String address;
    private double longitude; // x
    private double latitude; // y
    private String phone;
}
