package com.BE.TWT.model.dto.schedule;

import com.BE.TWT.model.entity.schedule.DaySchedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ScheduleDetail {
    private Long id;
    private String scheduleName;
    private String travelPlace;
    private LocalDate startAt;
    private LocalDate endAt;
    private String scheduleImageUrl;
    private Long memberId;
    private List<DaySchedule> dayScheduleList;
}
