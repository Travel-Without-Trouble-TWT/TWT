package com.BE.TWT.model.entity.schedule;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
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
    @Column(nullable = false)
    private Long scheduleId;
    @ElementCollection
    @CollectionTable(name = "course_list")
    private List<Course> courseList;
    private int dateNumber;
    private LocalDate day;

    @PrePersist // DB 저장하기 전 실행
    public void sortCourseListByArriveAt() {
        courseList.sort(Comparator.comparing(Course::getArriveAt));
    }

    public void addCourse(Course course) {
        this.courseList.add(course);
    }

    public void deleteCourse(Course course) {
        this.courseList.remove(course);
    }
}
