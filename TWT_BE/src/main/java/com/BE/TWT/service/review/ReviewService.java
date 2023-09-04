package com.BE.TWT.service.review;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.message.PlaceErrorMessage;
import com.BE.TWT.model.dto.review.ReviewDto;
import com.BE.TWT.model.entity.function.ReviewImage;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.review.ReviewRepository;
import com.BE.TWT.service.function.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;
import static com.BE.TWT.exception.message.PlaceErrorMessage.UNDEFINED_REVIEW;
import static com.BE.TWT.exception.message.PlaceErrorMessage.WRONG_ADDRESS;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public Review postPlaceReview (HttpServletRequest request, List<MultipartFile> multipartFile, ReviewDto reviewDto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Place place = placeRepository.findById(reviewDto.getPlaceId())
                .orElseThrow(() -> new PlaceException(PlaceErrorMessage.WRONG_ADDRESS));

        List<ReviewImage> reviewImages = s3Service.uploadFiles(multipartFile);
        List<String> listToSave = new ArrayList<>();

        for (ReviewImage image : reviewImages) {
            listToSave.add(image.getUploadFileUrl());
        }

        Review review = Review.builder()
                .place(place)
                .createAt(LocalDateTime.now())
                .nickName(member.getNickName())
                .reviewImageList(listToSave)
                .star(reviewDto.getStar())
                .reviewComment(reviewDto.getReviewComment())
                .memberProfileUrl(member.getProfileUrl())
                .build();

        place.addReview();
        place.updateAverageRating(place.getStar());

        return reviewRepository.save(review);
    }

    public Review viewReview(Long reviewId) {
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new PlaceException(UNDEFINED_REVIEW));
    }

    public Page<Review> viewAllReviewByMember(HttpServletRequest request, int pageNum) { // 유저가 작성한 리뷰 전체보기
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Pageable pageable = PageRequest.of(pageNum, 10);

        return reviewRepository.findAllByNickName(member.getNickName(), pageable);
    }

    public Page<Review> viewAllReviewByPlace(Long placeId, int pageNum) { // 특정 Place 에 대한 리뷰 전체보기
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        Pageable pageable = PageRequest.of(pageNum, 5);

        return reviewRepository.findAllByPlace(place, pageable);
    }
}
