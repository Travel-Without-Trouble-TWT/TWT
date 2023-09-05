package com.BE.TWT.controller.function;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.model.dto.function.Point;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.service.function.HeartService;
import com.BE.TWT.service.function.SearchService;
import com.BE.TWT.service.point.PointService;
import com.BE.TWT.service.review.ReviewService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "검색 API")
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private final PointService pointService;
    private final ReviewService reviewService;
    private final HeartService heartService;

    @ApiOperation(value = "방문지 TOP 10 검색")
    @Operation(description = "여행지 중에 좋아요 높은 순 검색 API")
    @GetMapping("/main")
    public ResponseEntity<List<Place>> findAllPlace() {
        return ResponseEntity.ok(searchService.searchTopTenPlace());
    }

    @ApiOperation(value = "지역 + 장소테마 필터링")
    @Operation(description = "지역 내에 명소,식당,숙소 추가 필터링")
    @GetMapping("/location")
    public ResponseEntity<Page<Place>> filterByPlaceTypeAndLocation(
            @RequestParam @Valid String placeLocation,
            @RequestParam @Valid String placeType,
            @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(searchService.findAllByPlaceTypeAndPlaceLocation(placeLocation, placeType, pageNum));
    }

    @ApiOperation(value = "특정 장소 검색")
    @Operation(description = "검색창 API")
    @GetMapping("/keyword")
    public ResponseEntity<Page<Place>> filterByPlaceTypeAndPlaceName(
            @RequestParam @Valid String placeName,
            @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(searchService.findAllByPlaceTypeAndPlaceName(placeName, pageNum));
    }

    @ApiOperation(value = "특정 장소 상세 보기")
    @Operation(description = "장소 상세보기")
    @GetMapping("/detail")
    public ResponseEntity<Place> filterByPlaceTypeAndPlaceName(HttpServletRequest request,
                                                               HttpServletResponse response,
                                                               @RequestParam @Valid Long placeId) {
        return ResponseEntity.ok(searchService.detailPlace(request, response, placeId));
    }

    @ApiOperation(value = "최근 여행 계획표 리스트")
    @Operation(description = "메인페이지 내에 최근에 종료된 여행 계획표를 최신순으로 보여주는 API")
    @GetMapping("/schedule")
    public ResponseEntity<Page<Schedule>> searchAllScheduleRecently(@RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(searchService.searchScheduleRecent(pageNum));
    }

    @ApiOperation(value = "나의 여행 계획표 리스트")
    @Operation(description = "내가 작성한 여행 계획표 리스트들")
    @GetMapping("/member/schedule")
    public ResponseEntity<Page<Schedule>> searchAllScheduleByMember(HttpServletRequest request,
                                                                    @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(searchService.searchScheduleByMember(request, pageNum));
    }

    @ApiOperation(value = "유저 리뷰 불러오기")
    @Operation(description = "유저가 작성한 리뷰 전체 불러오기")
    @GetMapping("/member/review")
    public ResponseEntity<Page<Review>> searchAllReviewByMember(HttpServletRequest request,
                                                              @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(reviewService.viewAllReviewByMember(request, pageNum));
    }

    @ApiOperation(value = "유저 좋아요 불러오기")
    @Operation(description = "유저가 누른 좋아요 장소 전체 불러오기")
    @GetMapping("/member/heart")
    public ResponseEntity<Page<Place>> searchAllHeartByMember(HttpServletRequest request,
                                                             @RequestParam @Valid int pageNum) {
        return ResponseEntity.ok(heartService.searchAllHeartByMember(request, pageNum));
    }
}
