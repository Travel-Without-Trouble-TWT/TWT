package com.BE.TWT.repository.location;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceName(String placeName);

    @Query("SELECT p FROM Place p WHERE p.placeType = :placeType AND p.placeLocation LIKE %:placeLocation%")
    Page<Place> findAllByPlaceTypeAndPlaceLocationContaining(@Param("placeType") PlaceType placeType, @Param("placeLocation") String placeLocation, Pageable pageable);

    Page<Place> findByPlaceLocationContaining(String placeLocation, Pageable pageable);
    Page<Place> findByPlaceNameContaining(String placeName, Pageable pageable);

    List<Place> findAllByPlaceLocation(String placeLocation);
}
