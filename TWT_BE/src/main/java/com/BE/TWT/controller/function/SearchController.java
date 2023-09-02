package com.BE.TWT.controller.function;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.service.function.SearchPlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {
    private final SearchPlaceService searchPlaceService;


    @GetMapping("/location")
    public ResponseEntity<List<Place>> filterByPlaceLocation(@RequestParam @Valid String placeLocation) {
        return ResponseEntity.ok(searchPlaceService.filterByPlace(placeLocation));
    }

    @GetMapping("/category")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndLocation(@RequestParam @Valid PlaceType placeType,
                                                                    @RequestParam @Valid String placeLocation) {
        return ResponseEntity.ok(searchPlaceService.filterByPlaceTypeAndPlaceLocation(placeType, placeLocation));
    }

    @GetMapping("/keyword")
    public ResponseEntity<List<Place>> filterByPlaceTypeAndPlaceName(@RequestParam @Valid PlaceType placeType,
                                                                    @RequestParam @Valid String placeName) {
        return ResponseEntity.ok(searchPlaceService.filterByPlaceTypeAndPlaceName(placeType, placeName));
    }
}
