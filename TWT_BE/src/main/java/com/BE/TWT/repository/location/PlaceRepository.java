package com.BE.TWT.repository.location;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceName(String placeName);

    List<Place> findByPlaceLocationContaining(String placeLocation);

    @Query("SELECT p FROM Place p WHERE p.placeType = :placeType AND p.placeName LIKE %:placeName%")
    List<Place> findByPlaceTypeAndPlaceNameContaining(@Param("placeType") PlaceType placeType, @Param("placeName")String placeName);

    @Query("SELECT p FROM Place p WHERE p.placeType = :placeType AND p.placeLocation LIKE %:placeLocation%")
    List<Place> findByPlaceTypeAndPlaceLocationContaining(@Param("placeType") PlaceType placeType, @Param("placeLocation") String placeLocation);

}
