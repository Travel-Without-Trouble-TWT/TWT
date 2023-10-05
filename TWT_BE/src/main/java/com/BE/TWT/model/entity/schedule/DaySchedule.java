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

    public void addCourse(Course course) {
        this.courseList.add(course);
    }

    public void deleteCourse(Course course) {
        this.courseList.remove(course);
    }

    @PrePersist
    public void setDistance() {
        for (int i = 0; i < this.courseList.size() - 1; i++) {
            double x1 = this.courseList.get(i).getLatitude();
            double y1 = this.courseList.get(i).getLongitude();
            double x2 = this.courseList.get(i + 1).getLatitude();
            double y2 = this.courseList.get(i + 1).getLongitude();

            Course course = this.courseList.get(i);

            course.calculateDistance(x1, y1, x2, y2);
        }
    }
}
