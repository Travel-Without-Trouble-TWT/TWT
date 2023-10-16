package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.model.dto.function.PlaceDetail;
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
import java.time.LocalDate;
import java.util.*;

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
        Pageable pageable = PageRequest.of(pageNum, 10, Sort.by(Sort.Direction.DESC, "placeHeart"));


        if(placeType.equals(PlaceType.HOT_PLACE.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContainingOrdered(PlaceType.HOT_PLACE, placeLocation, pageable);
        } else if (placeType.equals(PlaceType.RESTAURANT.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContainingOrdered(PlaceType.RESTAURANT, placeLocation, pageable);
        } else if (placeType.equals(PlaceType.STAY.getPlace())) {
            return placeRepository.findAllByPlaceTypeAndPlaceLocationContainingOrdered(PlaceType.STAY, placeLocation, pageable);
        } else {
            return placeRepository.findByPlaceLocationContainingOrdered(placeLocation, pageable);
        }
    }

    public Page<Place> findAllByPlaceTypeAndPlaceName(String placeName, int pageNum) { // 특정 장소 필터
        Pageable pageable = PageRequest.of(pageNum, 10, Sort.by(Sort.Direction.DESC, "placeHeart", "placeName"));

        return placeRepository.findByPlaceNameContainingOrderByIdDesc(placeName, pageable);
    }

    public List<Schedule> searchScheduleRecent() { // 최근 종료된 일정들을 최신순으로 불러오는 API
        LocalDate now = LocalDate.now();

        List<Schedule> schedules = scheduleRepository.findAllByEndAtBeforeOrderByIdDesc(now);

        return schedules;
    }

    public List<Place> searchTopTenPlace() {
        LocalDate endLocalDate = LocalDate.now().plusDays(1);
        LocalDate startLocalDate = endLocalDate.minusMonths(1);

        Date endDate = java.sql.Date.valueOf(endLocalDate);
        Date startDate = java.sql.Date.valueOf(startLocalDate);

        List<Object []> heartList = heartRepository.findTopPlacesByLikesInLastMonth(startDate, endDate);

        List<Place> placeList = new ArrayList<>();

        for (Object [] heart : heartList) {
            Long placeId = (Long) heart[0];
            Place place = placeRepository.findById(placeId).get();
            placeList.add(place);
        }

        int maxResults = 10;
        if (placeList.size() > maxResults) {
            placeList = placeList.subList(0, maxResults);
        }

        return placeList;
    }

    public Page<Schedule> searchScheduleByMember(HttpServletRequest request, String placeLocation, int pageNum) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        Pageable pageable = PageRequest.of(pageNum, 5);

        return scheduleRepository.findAllByMemberAndTravelPlaceOrderByIdDesc(member, placeLocation, pageable);
    }

    public PlaceDetail detailPlace(HttpServletRequest request, Long placeId) { // 특정 장소 상세 보기 + 유저가 좋아요를 눌렀는지 체크
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));
        boolean likeIt;

        if (request.getHeader("Authorization") != null) {
            String token = request.getHeader("Authorization").replace("Bearer ", "");
            String email = jwtTokenProvider.getPayloadSub(token);

            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

            if(heartRepository.findByMemberAndPlaceId(member, place.getId()).isPresent()) {
                likeIt = true;
            } else {
                likeIt = false;
            }
        } else {
            likeIt = false;
        }

        return PlaceDetail.builder()
                .id(placeId)
                .placeName(place.getPlaceName())
                .placeLocation(place.getPlaceLocation())
                .placeAddress(place.getPlaceAddress())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .placeImageUrl(place.getPlaceImageUrl())
                .placeDescription(place.getPlaceDescription())
                .placeHeart(place.getPlaceHeart())
                .reviewNum(place.getReviewNum())
                .totalStar(place.getTotalStar())
                .star(place.getStar())
                .placeCallNumber(place.getPlaceCallNumber())
                .placeType(place.getPlaceType())
                .likeIt(likeIt)
                .build();
    }

    public List<Schedule> findSamePlaceLocationSchedule(HttpServletRequest request, String placeLocation) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        return scheduleRepository.
                findAllByMemberAndTravelPlaceAndEndAtAfter(member, placeLocation, LocalDate.now());
    }

    public List<Place> findNearestPlace (Long placeId) {
        Place place = placeRepository.findById(placeId).get();

        List<Place> placeList = placeRepository.findAllByPlaceLocation(place.getPlaceLocation());

        List<Place> newPlaceList = new ArrayList<>();

        Map<Place, Double> hashMap = new HashMap<>();
        int count = 0;

        for (Place place1 : placeList) {
            if (place1.getPlaceName().equals(place.getPlaceName())) {
                continue;
            }
            double distance = calculateDistance(place, place1.getLatitude(), place1.getLongitude());

            hashMap.put(place1, distance);
            count++;

            if (count == 10) {
                break;
            }
        }
        List<Map.Entry<Place, Double>> entryList = new ArrayList<>(hashMap.entrySet());
        entryList.sort(Map.Entry.comparingByValue());

        for (Map.Entry<Place, Double> entry : entryList) {
            newPlaceList.add(entry.getKey());
        }

        return newPlaceList;
    }

    public double calculateDistance(Place place, double latitude, double longitude) {
        // 각 좌표 간의 차의 합의 절대값 계산
        double latDiff = Math.abs(latitude - place.getLatitude());
        double lonDiff = Math.abs(longitude - place.getLongitude());
        return latDiff + lonDiff;
    }
}
