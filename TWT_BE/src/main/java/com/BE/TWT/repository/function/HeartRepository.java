package com.BE.TWT.repository.function;

import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.type.PlaceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {
    Optional<Heart> findById(Long id);
    @Query("SELECT h FROM Heart h WHERE h.member = :member AND h.placeType = :placeType AND h.placeName = :placeName")
    List<Heart> findByMemberAndPlaceTypeAndPlaceId(
            @Param("member") Member member,
            @Param("placeType") PlaceType placeType,
            @Param("placeName") String placeName
    );

    void delete(Heart heart);
}
