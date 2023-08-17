package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.message.MemberErrorMessage;
import com.BE.TWT.model.dto.function.HeartDto;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.type.PlaceType;
import com.BE.TWT.repository.function.HeartRepository;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import static com.BE.TWT.exception.message.PlaceErrorMessage.*;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public String likeIt (HttpServletRequest request, HeartDto heartDto) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(MemberErrorMessage.USER_NOT_FOUND));

        Place place = placeRepository.findByPlaceName(heartDto.getPlaceName())
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        PlaceType placeType = heartDto.getPlaceType();

        if (heartRepository.findByMemberAndPlaceTypeAndPlaceId
                (member, placeType, heartDto.getPlaceName()).isPresent()) {

            Heart heart = heartRepository.findByMemberAndPlaceTypeAndPlaceId
                            (member, placeType, heartDto.getPlaceName())
                    .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

            heartRepository.deleteById(heart.getId());
            place.minusHeart();
            return "좋아요 취소";
        } else {
            Heart heart = Heart.builder()
                    .placeName(heartDto.getPlaceName())
                    .placeType(heartDto.getPlaceType())
                    .member(member)
                    .build();
            heartRepository.save(heart);
            place.plusHeart();
            return "좋아용";
        }
    }
}
