package com.BE.TWT.model.dto.function;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveSharedScheduleDto {
    private Long scheduleId;
    private String startAt;
    private String endAt;
}
