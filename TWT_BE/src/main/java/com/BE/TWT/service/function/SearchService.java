package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;
import static com.BE.TWT.exception.message.PlaceErrorMessage.*;

@Service
@RequiredArgsConstructor
public class SearchService {
    private final PlaceRepository placeRepository;
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;


    public List<Place> filterByPlace(String placeLocation) { // 지역 필터
        List<Place> placeList = placeRepository.findByPlaceLocationContaining(placeLocation);

        Comparator<Place> placeHeartComparator = Comparator.comparingInt(Place::getPlaceHeart).reversed();

        placeList.sort(placeHeartComparator);

        return placeList;
    }

    public Page<Place> findAllByPlaceTypeAndPlaceLocation(String placeLocation, String placeType, int pageNum) { // 지역 내 카테고리 필터
        Pageable pageable = PageRequest.of(pageNum, 10, Sort.by("placeHeart").descending());

        if(placeType.equals(PlaceType.HOT_PLACE.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContaining(PlaceType.HOT_PLACE, placeLocation, pageable);
        } else if (placeType.equals(PlaceType.RESTAURANT.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContaining(PlaceType.RESTAURANT, placeLocation, pageable);
        } else if (placeType.equals(PlaceType.STAY.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContaining(PlaceType.STAY, placeLocation, pageable);
        } else {
            return placeRepository.findByPlaceLocationContaining(placeLocation, pageable);
        }
    }

    public Page<Place> findAllByPlaceTypeAndPlaceName(String placeName, int pageNum) { // 특정 장소 필터
        Pageable pageable = PageRequest.of(pageNum, 10, Sort.by("placeHeart").descending());

        return placeRepository.findByPlaceNameContaining(placeName, pageable);
    }

    public Page<Schedule> searchScheduleRecent(int pageNum) { // 최근 종료된 일정들을 최신순으로 불러오는 API
        LocalDate now = LocalDate.now();
        Pageable pageable = PageRequest.of(pageNum, 10);

        Page<Schedule> schedules = scheduleRepository.findAllByEndAtBeforeOrderByIdDesc(now, pageable);

        return schedules;
    }

    public List<Place> searchTopTenPlace() {
        return placeRepository.findTop10ByOrderByPlaceHeartDesc();
    }

    public List<Schedule> searchScheduleByMember(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        return scheduleRepository.findAllByMember(member);
    }

    public Page<Place> searchPlaceByPlaceLocation(int pageNum, String placeLocation) {
        Pageable pageable = PageRequest.of(pageNum, 10, Sort.by("placeHeart").descending());

        return placeRepository.findByPlaceLocationContaining(placeLocation, pageable);
    }

    public Place detailPlace(String placeName) { // 특정 장소 상세 보기
        return placeRepository.findByPlaceName(placeName)
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));
    }
}
