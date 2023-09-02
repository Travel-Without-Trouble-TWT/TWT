package com.BE.TWT.service.function;

import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.location.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchPlaceService {
    private final PlaceRepository placeRepository;

    public List<Place> filterByPlace(String placeLocation) { // 지역 필터

        List<Place> placeList = placeRepository.findByPlaceLocationContaining(placeLocation);

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public List<Place> filterByPlaceTypeAndPlaceLocation(PlaceType type, String placeLocation) { // 지역 내 카테고리 필터
        PlaceType placeType = null;

        if (type.equals(PlaceType.HOT_PLACE)) {
            placeType = PlaceType.HOT_PLACE;
        } else if (type.equals(PlaceType.RESTAURANT)) {
            placeType = PlaceType.RESTAURANT;
        } else {
            placeType = PlaceType.STAY;
        }

        List<Place> placeList = placeRepository.findByPlaceTypeAndPlaceLocationContaining(placeType, placeLocation);

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public List<Place> filterByPlaceTypeAndPlaceName(PlaceType type, String placeName) { // 지역 내 검색 필터
        PlaceType placeType = null;

        if (type.equals(PlaceType.HOT_PLACE)) {
            placeType = PlaceType.HOT_PLACE;
        } else if (type.equals(PlaceType.RESTAURANT)) {
            placeType = PlaceType.RESTAURANT;
        } else {
            placeType = PlaceType.STAY;
        }

        List<Place> placeList = placeRepository.findByPlaceTypeAndPlaceNameContaining(placeType, placeName);

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }
}
