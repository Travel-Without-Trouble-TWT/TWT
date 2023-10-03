package com.BE.TWT.service.function;

import com.BE.TWT.config.CookieProvider;
import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.model.entity.function.Heart;
import com.BE.TWT.model.entity.function.Notification;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.review.Review;
import com.BE.TWT.model.entity.schedule.DaySchedule;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.function.HeartRepository;
import com.BE.TWT.repository.function.NotificationRepository;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.review.ReviewRepository;
import com.BE.TWT.repository.schedule.DayScheduleRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.List;

import static com.BE.TWT.exception.message.MemberErrorMessage.USER_NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class WithDraw { // 순환 참조 방지 회원 탈퇴 API 만 따로 생성
    private final HeartRepository heartRepository;
    private final NotificationRepository notificationRepository;
    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final DayScheduleRepository dayScheduleRepository;
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final CookieProvider cookieProvider;

    public String withDrawMember(HttpServletRequest request, HttpServletResponse response) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(USER_NOT_FOUND));

        List<Heart> heartList = heartRepository.findAllByMember(member);
        heartRepository.deleteAllInBatch(heartList); // 좋아요 삭제

        List<Review> reviewList = reviewRepository.findAllByNickName(member.getNickName());
        reviewRepository.deleteAllInBatch(reviewList); // 리뷰 삭제

        List<Schedule> scheduleList = scheduleRepository.findAllByMember(member);
        for (Schedule schedule : scheduleList) {
            List<DaySchedule> dayScheduleList = dayScheduleRepository.findAllBySchedule(schedule);
            dayScheduleRepository.deleteAllInBatch(dayScheduleList); // 당일 일정 삭제
        }
        scheduleRepository.deleteAllInBatch(scheduleList); // 전체 일정 삭제

        List<Notification> notificationList = notificationRepository.findAllByMember(member);
        notificationRepository.deleteAllInBatch(notificationList); // 누적 미확인 알림 삭제

        cookieProvider.deleteRefreshTokenCookie(response); // 리프레쉬 쿠키 삭제

        memberRepository.delete(member); // 유저 삭제

        return "회원 탈퇴가 완료되었습니다.";
    }
}
