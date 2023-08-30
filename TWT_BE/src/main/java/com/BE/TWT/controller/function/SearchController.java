package com.BE.TWT.controller.function;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.model.dto.function.Point;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndLocation;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndName;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.service.function.SearchService;
import com.BE.TWT.service.point.PointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Api(tags = "검색 API")
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchService searchService;
    private final PointService pointService;

    @ApiOperation(value = "방문지 TOP 10 검색")
    @Operation(description = "여행지 중에 좋아요 높은 순 검색 API")
    @GetMapping("/main")
    public ResponseEntity<List<Place>> findAllPlace() {
        return ResponseEntity.ok(searchService.searchAllPlace());
    }

    @ApiOperation(value = "지역 필터링")
    @Operation(description = "큰 지역값을 기준으로 필터링된 장소 리스트")
    @GetMapping("/location")
    public ResponseEntity<List<Place>> filterByPlaceLocation(@RequestParam @Valid String placeLocation) {
        return ResponseEntity.ok(searchService.filterByPlace(placeLocation));
    }

    @ApiOperation(value = "지역 + 장소테마 필터링")
    @Operation(description = "지역 내에 명소,식당,숙소 추가 필터링")
    @GetMapping("/category")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndLocation(@RequestBody @Valid SearchOfPlaceTypeAndLocation dto) {
        return ResponseEntity.ok(searchService.filterByPlaceTypeAndPlaceLocation(dto));
    }

    @ApiOperation(value = "특정 장소 검색")
    @Operation(description = "검색창 API")
    @GetMapping("/keyword")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndPlaceName(@RequestBody @Valid SearchOfPlaceTypeAndName dto) {
        return ResponseEntity.ok(searchService.filterByPlaceTypeAndPlaceName(dto));
    }

    @ApiOperation(value = "좌표 검색 API")
    @Operation(description = "장소명 검색하면 x,y 값 리턴")
    @GetMapping("/point")
    public ResponseEntity<Point> findPoint(@RequestParam @Valid String place) throws MapException {
        return ResponseEntity.ok(pointService.getMapString(place));
    }

    @ApiOperation(value = "최근 여행 계획표 리스트")
    @Operation(description = "메인페이지 내에 최근에 종료된 여행 계획표를 최신순으로 보여주는 API")
    @GetMapping("/recent")
    public ResponseEntity<List<Schedule>> searchAllScheduleRecently() {
        return ResponseEntity.ok(searchService.searchScheduleRecent());
    }

    @ApiOperation(value = "나의 여행 계획표 리스트")
    @Operation(description = "내가 작성한 여행 계획표 리스트들")
    @GetMapping("/member")
    public ResponseEntity<List<Schedule>> searchAllScheduleByMember(HttpServletRequest request) {
        return ResponseEntity.ok(searchService.searchScheduleByMember(request));
    }
}
