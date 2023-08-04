package com.BE.TWT.controller.review;

import com.BE.TWT.model.dto.review.ReviewDto;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.service.review.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService ReviewService;

    @PostMapping("/place")
    public ResponseEntity<Review> postPlaceReview(
            HttpServletRequest request,
            @RequestPart(value = "files", required = false) List<MultipartFile> multipartFile,
            @RequestPart(value = "request") @Valid ReviewDto reviewDto) {
        return ResponseEntity.ok(ReviewService.postPlaceReview(request, multipartFile, reviewDto));
    }
}
