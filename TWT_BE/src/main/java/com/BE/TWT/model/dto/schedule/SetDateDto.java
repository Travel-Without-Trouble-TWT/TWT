package com.BE.TWT.model.dto.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SetDateDto {
    private Long scheduleId;
    private LocalDate startAt;
    private LocalDate endAt;
}
