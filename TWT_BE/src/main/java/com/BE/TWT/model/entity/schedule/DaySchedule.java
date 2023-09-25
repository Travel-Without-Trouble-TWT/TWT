package com.BE.TWT.model.entity.schedule;

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
public class DaySchedule { // 당일 일정
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "schedule_id", referencedColumnName = "id")
    private Schedule schedule;
    @ElementCollection
    @CollectionTable(name = "course_list")
    private List<Course> courseList;
    private int dateNumber;
    private LocalDate day;
    private double totalLatitude;
    private double totalLongitude; // 총 좌표값
    private double averageLatitude;
    private double averageLongitude; // 평균 좌표값

    public void addCourse(Course course) {
        this.courseList.add(course);
    }

    public void deleteCourse(Course course) {
        this.courseList.remove(course);
    }

    public void calculateLatitude(double latitude, double longitude) {
        this.totalLatitude += latitude;
        this.totalLongitude += longitude;
        this.averageLatitude = totalLatitude / courseList.size();
        this.averageLongitude = totalLongitude / courseList.size();
    }

    public void changeDate(LocalDate date) {
        this.day = date;
    }
}
