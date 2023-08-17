package com.BE.TWT.controller.function;

import com.BE.TWT.exception.error.MapException;
import com.BE.TWT.model.dto.function.Point;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndLocation;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndName;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.service.function.SearchPlaceService;
import com.BE.TWT.service.point.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchPlaceService searchPlaceService;
    private final PointService pointService;


    @GetMapping("/location")
    public ResponseEntity<List<Place>> filterByPlaceLocation(@RequestParam @Valid String placeLocation) {
        return ResponseEntity.ok(searchPlaceService.filterByPlace(placeLocation));
    }

    @GetMapping("/category")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndLocation(@RequestBody @Valid SearchOfPlaceTypeAndLocation dto) {
        return ResponseEntity.ok(searchPlaceService.filterByPlaceTypeAndPlaceLocation(dto));
    }

    @GetMapping("/keyword")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndPlaceName(@RequestBody @Valid SearchOfPlaceTypeAndName dto) {
        return ResponseEntity.ok(searchPlaceService.filterByPlaceTypeAndPlaceName(dto));
    }

    @GetMapping("/point")
    public ResponseEntity<Point> findPoint(@RequestParam @Valid String place) throws MapException {
        return ResponseEntity.ok(pointService.getMapString(place));
    }
}
