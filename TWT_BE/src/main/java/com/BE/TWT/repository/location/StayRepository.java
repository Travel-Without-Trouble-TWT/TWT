package com.BE.TWT.repository.location;

import com.BE.TWT.model.entity.location.Stay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StayRepository extends JpaRepository<Stay, Long> {
    Optional<Stay> findByStayName(String stayName);
}
