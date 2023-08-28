package com.BE.TWT.repository.schedule;

import com.BE.TWT.model.entity.schedule.DaySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DaySchedueRepository extends JpaRepository<DaySchedule, Long> {
}
