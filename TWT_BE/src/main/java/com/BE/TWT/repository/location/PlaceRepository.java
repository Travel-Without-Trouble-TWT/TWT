package com.BE.TWT.repository.location;

import com.BE.TWT.model.entity.location.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceName(String placeName);
}
