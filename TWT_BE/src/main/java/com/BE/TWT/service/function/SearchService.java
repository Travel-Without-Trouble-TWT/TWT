package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndLocation;
import com.BE.TWT.model.dto.function.SearchOfPlaceTypeAndName;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.review.ReviewRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;


    public List<Place> filterByPlace(String placeLocation) { // 지역 필터

        List<Place> placeList = placeRepository.findByPlaceLocationContaining(placeLocation);

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public List<Place> filterByPlaceTypeAndPlaceLocation(SearchOfPlaceTypeAndLocation dto) { // 지역 내 카테고리 필터
        PlaceType placeType = null;

        if (dto.getPlaceType().equals(PlaceType.HOT_PLACE)) {
            placeType = PlaceType.HOT_PLACE;
        } else if (dto.getPlaceType().equals(PlaceType.RESTAURANT)) {
            placeType = PlaceType.RESTAURANT;
        } else {
            placeType = PlaceType.STAY;
        }

        List<Place> placeList = placeRepository.findByPlaceTypeAndPlaceLocationContaining(placeType, dto.getPlaceLocation());

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public List<Place> filterByPlaceTypeAndPlaceName(SearchOfPlaceTypeAndName dto) { // 지역 내 검색 필터
        PlaceType placeType = null;

        if (dto.getPlaceType().equals(PlaceType.HOT_PLACE)) {
            placeType = PlaceType.HOT_PLACE;
        } else if (dto.getPlaceType().equals(PlaceType.RESTAURANT)) {
            placeType = PlaceType.RESTAURANT;
        } else {
            placeType = PlaceType.STAY;
        }

        List<Place> placeList = placeRepository.findByPlaceTypeAndPlaceNameContaining(placeType, dto.getPlaceName());

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    /**
     * 0. 검색 결과들 페이징 처리하기 (TODO)
     * 1. 메인페이지 최근 많이 저장된 맛집 + 여행지 검색 API (IN PROGRESS)
     * 2. 메인페이지 최근 여행 리뷰 ( 유저들이 만든 스케줄 최신 순 리스트 API ) (DONE)
     * 3. 알림 ( 여행 계획 일자 D-1 에 "여행 떠날 준비는 잘 하셨나요~?" , 여행 일정이 끝나고 "여행지 리뷰를 남겨주세요!" (DONE)
     * 4. 여행 계획 친구와 공유하기 ( 계획 동시 소유 ) (CANT)
     * 5. 여행지 DB에 채우기 ( description 값은 스스로 찾아서 채워야할듯 ) (DONE)
     * 6. FileZilla 로 압축해서 AWS 배포하기 (TODO)
     */

    public List<Place> searchHotPlace() { // 메인페이지 최근 많이 저장된 맛집 + 여행지 검색 API
        return null;
    }

    public List<Schedule> searchScheduleRecent() { // 최근 종료된 일정들을 최신순으로 불러오는 API
        LocalDate now = LocalDate.now();
        List<Schedule> scheduleList = new ArrayList<>();
        List<Schedule> schedules = scheduleRepository.findAllByOrderByIdDesc();

        for(Schedule schedule : schedules) {
            if(schedule.getEndAt().isBefore(now)) {
                scheduleList.add(schedule);
            }
        }
        return scheduleList;
    }

    public List<Place> searchAllPlace() {
        List<Place> placeList = placeRepository.findAll();
        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public List<Schedule> searchScheduleByMember(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        return scheduleRepository.findAllByMember(member);
    }
}
