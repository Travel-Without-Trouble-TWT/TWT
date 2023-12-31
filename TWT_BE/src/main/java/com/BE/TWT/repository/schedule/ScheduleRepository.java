package com.BE.TWT.repository.schedule;

import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAllByEndAtBeforeOrderByIdDesc(LocalDate date);
    List<Schedule> findAllByStartAt(LocalDate startAt);
    List<Schedule> findALlByEndAt(LocalDate endAt);

    Page<Schedule> findAllByMemberAndTravelPlaceOrderByIdDesc(Member member, String travelPlace, Pageable pageable);

    List<Schedule> findAllByMember(Member member);

    List<Schedule> findAllByMemberAndTravelPlaceAndEndAtAfter(Member member, String travelPlace, LocalDate date);
}
