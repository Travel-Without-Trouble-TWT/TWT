package com.BE.TWT.model.dto.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateScheduleDto {
    private String placeLocation;
    private String startAt;
    private String endAt;
    private Long placeId;
    private int when;
}
