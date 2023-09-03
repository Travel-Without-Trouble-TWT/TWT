package com.BE.TWT.model.entity.schedule;

import com.BE.TWT.model.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String scheduleName;
    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "id")
    private Member member;
    @Column(nullable = false)
    private String travelPlace;
    private LocalDate startAt;
    private LocalDate endAt;
    private int days;
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, mappedBy = "schedule")
    private List<DaySchedule> dayScheduleList;
    private String scheduleImageUrl;

    public void updateDate(LocalDate start, LocalDate end) {
        this.startAt = start;
        this.endAt = end;
    }

    public void uploadPhoto(String url) {
        this.scheduleImageUrl = url;
    }

    public void changeDayScheduleList(List<DaySchedule> list) {
        this.dayScheduleList = list;
    }

    public void insertDays(int day) {
        this.days = day;
    }

    public void editScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }
}
