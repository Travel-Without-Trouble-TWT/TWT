package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.function.HeartRepository;
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
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;
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
    private final HeartRepository heartRepository;

    public Page<Place> findAllByPlaceTypeAndPlaceLocation(String placeLocation, String placeType, int pageNum) { // 지역 내 카테고리 필터 ( 전체 기능 추가 )
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

    public Page<Schedule> searchScheduleByMember(HttpServletRequest request, int pageNum) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Pageable pageable = PageRequest.of(pageNum, 10);

        return scheduleRepository.findAllByMemberOrderByIdDesc(member, pageable);
    }

    public Place detailPlace(HttpServletRequest request, HttpServletResponse response, Long placeId) { // 특정 장소 상세 보기 + 유저가 좋아요를 눌렀는지 체크
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        if (!request.getHeader("Authorization").isEmpty()) {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
            String email = jwtTokenProvider.getPayloadSub(token);

            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

            if(heartRepository.findByMemberAndPlaceId(member, place.getPlaceName()).isPresent()) {
                response.addHeader("likeIt", "true");
            } else {
                response.addHeader("likeIt", "false");
            }
        } else {
            response.addHeader("likeIt", "false");
        }

        return place;
    }

    public List<Schedule> findSamePlaceLocationSchedule(HttpServletRequest request, String placeLocation) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        return scheduleRepository.
                findAllByMemberAndTravelPlaceAndEndAtBefore(member, placeLocation, LocalDate.now());
    }
}
