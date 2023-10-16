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

    @Query("SELECT p FROM Place p WHERE p.placeType = :placeType AND p.placeLocation LIKE %:placeLocation%" + "ORDER BY p.placeHeart DESC, p.placeName ASC")
    Page<Place> findAllByPlaceTypeAndPlaceLocationContainingOrdered(@Param("placeType") PlaceType placeType, @Param("placeLocation") String placeLocation, Pageable pageable);

    @Query("SELECT p FROM Place p WHERE p.placeLocation LIKE %:placeLocation%" + "ORDER BY p.placeHeart DESC, p.placeName ASC")
    Page<Place> findByPlaceLocationContainingOrdered(@Param("placeLocation") String placeLocation, Pageable pageable);
    Page<Place> findByPlaceNameContainingOrderByIdDesc(String placeName, Pageable pageable);
    List<Place> findAllByPlaceLocation(String placeLocation);
}
