package com.BE.TWT.controller.review;

import com.BE.TWT.model.dto.review.ReviewDto;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.service.review.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "리뷰 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @ApiOperation(value = "리뷰 작성")
    @Operation(description = "사진없이는 작성이 안됨..!")
    @PostMapping("/place")
    public ResponseEntity<Review> postPlaceReview(
            HttpServletRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> multipartFile,
            @RequestBody @Valid ReviewDto reviewDto) {
        return ResponseEntity.ok(reviewService.postPlaceReview(request, multipartFile, reviewDto));
    }

    @ApiOperation(value = "리뷰 읽기")
    @Operation(description = "특정 리뷰 읽기")
    @GetMapping("/info")
    public ResponseEntity<Review> readReview(@RequestParam @Valid Long reviewId) {
        return ResponseEntity.ok(reviewService.viewReview(reviewId));
    }

    @ApiOperation(value = "장소 리뷰 전체 불러오기")
    @Operation(description = "특정 장소 리뷰 전체 불러오기")
    @GetMapping("/place")
    public ResponseEntity<Page<Review>> readAllReviewByPlace(@RequestParam @Valid Long placeId,
                                                             @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(reviewService.viewAllReviewByPlace(placeId, pageNum));
    }
}
