package com.BE.TWT.repository.schedule;

import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DayScheduleRepository extends JpaRepository<DaySchedule, Long> {
    List<DaySchedule> findAllBySchedule(Schedule schedule);
}
