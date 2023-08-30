package com.BE.TWT.repository.schedule;

import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Page<Schedule> findAllByEndAtBeforeOrderByIdDesc(LocalDate date, Pageable pageable);
    List<Schedule> findAllByStartAt(LocalDate startAt);
    List<Schedule> findALlByEndAt(LocalDate endAt);

    List<Schedule> findAllByMember(Member member);
}
