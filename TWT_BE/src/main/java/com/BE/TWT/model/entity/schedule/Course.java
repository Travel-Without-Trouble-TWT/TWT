package com.BE.TWT.model.entity.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
@Builder
public class Course {
    private Long placeId; // 장소 id
    private LocalDateTime arriveAt; // 도착 시간

    public void setTime(LocalDateTime time) {
        this.arriveAt = time;
    }
}
