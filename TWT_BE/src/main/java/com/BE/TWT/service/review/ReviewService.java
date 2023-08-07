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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final PlaceRepository placeRepository;
    private final ReviewRepository placeReviewRepository;
    private final MemberRepository memberRepository;
    private final S3Service s3Service;
    private final JwtTokenProvider jwtTokenProvider;

    public Review postPlaceReview (HttpServletRequest request, List<MultipartFile> multipartFile, ReviewDto reviewDto) {
        String token = request.getHeader("Authorization");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Place place = placeRepository.findByPlaceName(reviewDto.getPlaceName())
                .orElseThrow(() -> new PlaceException(PlaceErrorMessage.WRONG_ADDRESS));

        List<ReviewImage> reviewImages = s3Service.uploadFiles(multipartFile);

        Review review = Review.builder()
                .place(place)
                .createAt(LocalDate.now())
                .memberId(member.getId())
                .reviewImageList(reviewImages)
                .star(reviewDto.getStar())
                .reviewComment(reviewDto.getReviewComment())
                .build();

        place.updateAverageRating(place.getStar());

        return placeReviewRepository.save(review);
    }
}
