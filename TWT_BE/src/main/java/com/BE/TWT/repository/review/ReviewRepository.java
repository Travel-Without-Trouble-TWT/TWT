package com.BE.TWT.repository.review;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.review.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Optional<Review> findById(Long id);

    Page<Review> findAllByNickName(String nickName, Pageable pageable);

    Page<Review> findAllByPlaceOrderByIdDesc(Place place, Pageable pageable);

    List<Review> findAllByNickName(String nickName);
}
