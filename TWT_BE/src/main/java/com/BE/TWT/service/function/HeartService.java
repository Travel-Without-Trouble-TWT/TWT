package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.PlaceException;
import com.BE.TWT.exception.message.MemberErrorMessage;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.location.Place;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.repository.function.HeartRepository;
import com.BE.TWT.repository.location.PlaceRepository;
import com.BE.TWT.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;

import static com.BE.TWT.exception.message.PlaceErrorMessage.*;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public String likeIt (HttpServletRequest request, Long placeId) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(MemberErrorMessage.USER_NOT_FOUND));

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

        if (heartRepository.findByMemberAndPlaceId(member, place.getId()).isPresent()) {

            Heart heart = heartRepository.findByMemberAndPlaceId(member, place.getId())
                    .orElseThrow(() -> new PlaceException(WRONG_ADDRESS));

            heartRepository.deleteById(heart.getId());

            place.minusHeart();
            return "좋아요 취소";
        } else {
            Heart heart = Heart.builder()
                    .placeId(place.getId())
                    .member(member)
                    .build();
            heartRepository.save(heart);
            place.plusHeart();
            return "좋아요!";
        }
    }

    public Page<Place> searchAllHeartByMember(HttpServletRequest request, int pageNum) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(MemberErrorMessage.USER_NOT_FOUND));

        List<Heart> heartList = heartRepository.findAllByMember(member);

        List<Place> placeList = new ArrayList<>();

        for (Heart heart : heartList) {
            Place place = placeRepository.findById(heart.getPlaceId()).get();
            placeList.add(place);
        }

        Pageable pageable = PageRequest.of(pageNum, 10);

        return listToPage(placeList, pageable);
    }

    public Page<Place> listToPage(List<Place> list, Pageable pageable) {
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), list.size());

        List<Place> subList = list.subList(start, end);

        return new PageImpl<>(subList, pageable, list.size());
    }


}
