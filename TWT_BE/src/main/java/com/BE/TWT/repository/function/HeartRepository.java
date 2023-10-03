package com.BE.TWT.repository.function;

import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HeartRepository extends JpaRepository<Heart, Long> {
    Optional<Heart> findById(Long id);
    @Query("SELECT h FROM Heart h WHERE h.member = :member AND h.placeId = :placeId")
    Optional<Heart> findByMemberAndPlaceId(
            @Param("member") Member member,
            @Param("placeId") Long placeId
    );

    @Modifying
    @Query("DELETE FROM Heart h WHERE h.id = :heartId")
    void deleteById(@Param("heartId") Long heartId);

    List<Heart> findAllByMember(Member member);

    @Query("SELECT h.placeId, COUNT(h) AS likeCount " +
            "FROM Heart h " +
            "WHERE h.likedDate >= :startDate AND h.likedDate <= :endDate " +
            "GROUP BY h.placeId " +
            "ORDER BY likeCount DESC ")
    List<Object []> findTopPlacesByLikesInLastMonth(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
}
