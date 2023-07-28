package com.BE.TWT.service.review;

import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.message.MemberErrorMessage;
import com.BE.TWT.model.dto.HeartDto;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.location.Restaurant;
import com.BE.TWT.model.entity.location.Stay;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.function.HeartRepository;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.location.RestaurantRepository;
import com.BE.TWT.repository.location.StayRepository;
import com.BE.TWT.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.BE.TWT.exception.message.PlaceErrorMessage.*;

@Service
@RequiredArgsConstructor
@Transactional
public class HeartService {
    private final HeartRepository heartRepository;
    private final PlaceRepository placeRepository;
    private final RestaurantRepository restaurantRepository;
    private final StayRepository stayRepository;
    private final MemberRepository memberRepository;

    public Heart likeIt (HeartDto heartDto) {
        Member member = memberRepository.findById(heartDto.getMemberId())
                .orElseThrow(() -> new MemberException(MemberErrorMessage.USER_NOT_FOUND));
        List<Heart> heartList;

        Heart heart = Heart.builder()
                .placeName(heartDto.getPlaceName())
                .placeType(heartDto.getPlaceType())
                .member(member)
                .build();

        if (heartDto.getPlaceType().getPlace().equals("명소")) {
            Place place = placeRepository.findByPlaceName(heartDto.getPlaceName())
                    .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

            heartList = heartRepository.findByMemberAndPlaceTypeAndPlaceId
                    (member, PlaceType.HOT_PLACE, heartDto.getPlaceName());

            if (heartList.isEmpty()) {
                heartRepository.save(heart);
                place.plusHeart();
            } else {
                heartRepository.delete(heart);
                place.minusHeart();
            }
        }

        if (heartDto.getPlaceType().getPlace().equals("맛집")) {
            Restaurant restaurant = restaurantRepository
                    .findByRestaurantName(heartDto.getPlaceName())
                    .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

            heartList = heartRepository.findByMemberAndPlaceTypeAndPlaceId
                    (member, PlaceType.HOT_PLACE, heartDto.getPlaceName());

            if (heartList.isEmpty()) {
                heartRepository.save(heart);
                restaurant.plusHeart();
            } else {
                heartRepository.delete(heart);
                restaurant.minusHeart();
            }
        }

        if (heartDto.getPlaceType().getPlace().equals("숙소")) {
            Stay stay = stayRepository.findByStayName(heart.getPlaceName())
                    .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

            heartList = heartRepository.findByMemberAndPlaceTypeAndPlaceId
                    (member, PlaceType.HOT_PLACE, heartDto.getPlaceName());

            if (heartList.isEmpty()) {
                heartRepository.save(heart);
                stay.plusHeart();
            } else {
                heartRepository.delete(heart);
                stay.minusHeart();
            }
        }
        return heart;
    }
}
