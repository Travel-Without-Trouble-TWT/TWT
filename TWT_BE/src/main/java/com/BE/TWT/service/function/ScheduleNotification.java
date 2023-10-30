package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.exception.error.MemberException;
import com.BE.TWT.exception.error.ScheduleException;
import com.BE.TWT.exception.message.MemberErrorMessage;
import com.BE.TWT.model.entity.function.Notification;
import com.BE.TWT.model.entity.member.Member;
import com.BE.TWT.model.entity.schedule.Schedule;
import com.BE.TWT.repository.function.NotificationRepository;
import com.BE.TWT.repository.member.MemberRepository;
import com.BE.TWT.repository.schedule.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.BE.TWT.exception.message.ScheduleErrorMessage.ALREADY_DELETED_ALARM;

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleNotification {
    private final NotificationRepository notificationRepository;
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();


    @Scheduled(cron = "0 0 0 * * ?", zone = "Asia/Seoul")
    public void sendStartNotification() {
        LocalDate today = LocalDate.now();
        // 시작 날짜 알림
        List<Schedule> startSchedules = scheduleRepository.findAllByStartAt(today);

        for (Schedule startSchedule : startSchedules) {
            Long memberId = startSchedule.getMember().getId();

            Notification notification = Notification.builder()
                    .schedule(startSchedule)
                    .message("여행 D - Day 입니다! 준비는 다 되셨나요~?")
                    .build();

            if (sseEmitters.containsKey(memberId)) {
                SseEmitter sseEmitter = sseEmitters.get(memberId);
                try {
                    sseEmitter.send(SseEmitter.event().name("notification").data("여행 D - Day 입니다! 준비는 다 되셨나요~?"));

                    notificationRepository.save(notification);
                } catch (IOException e) {
                    sseEmitters.remove(memberId);
                    notificationRepository.delete(notification);
                }
            }
        }
    }

    @Scheduled(cron = "0 59 23 * * ?", zone = "Asia/Seoul")
    public void sendEndNotification() {
        LocalDate today = LocalDate.now();

        // 종료 날짜 알림
        List<Schedule> endSchedules = scheduleRepository.findALlByEndAt(today);

        for (Schedule endSchedule : endSchedules) {
            Long memberId = endSchedule.getMember().getId();

            Notification notification = Notification.builder()
                    .schedule(endSchedule)
                    .message("여행은 즐거우셨나요? 리뷰를 남겨 여행을 기록해보시는건 어떨까요?")
                    .build();

            if (sseEmitters.containsKey(memberId)) {
                SseEmitter sseEmitter = sseEmitters.get(memberId);
                try {
                    sseEmitter.send(SseEmitter.event().name("notification").data("여행은 즐거우셨나요? 리뷰를 남겨 여행을 기록해보시는건 어떨까요?"));
                    notificationRepository.save(notification);
                } catch (IOException e) {
                    sseEmitters.remove(memberId);
                    notificationRepository.delete(notification);
                }
            }
        }
    }

    public SseEmitter subscribeSse(HttpServletRequest request) {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);
        Long memberId = memberRepository.findByEmail(email).get().getId();

        SseEmitter sseEmitter = new SseEmitter(Long.MAX_VALUE);

        try {
            sseEmitter.send(SseEmitter.event().name("connect"));
        } catch (IOException e) {
            e.printStackTrace();
        }

        sseEmitters.put(memberId, sseEmitter);

        sseEmitter.onCompletion(() -> sseEmitters.remove(memberId));
        sseEmitter.onTimeout(() -> sseEmitters.remove(memberId));
        sseEmitter.onError((e) -> sseEmitters.remove(memberId));

        return sseEmitter;
    }

    /**
     * 알림 로직 구현 방법
     * 1. DB의 스케줄을 확인해서 로직에 해당되는 애들(당일 일정)이 있는지 확인한다.
     * 2. 있으면 해당된 유저들에게 모두 알림을 보낸다 /emitter/sub/{memberId}
     * 3. 그리고 member 연관된 notification 을 DB에 저장하고 boolean type 값 checked 를 "false" 로 한다.
     * 4. 유저가 확인했을 경우 checked 는 "true" 로 변경하고 알림 삭제를 해야하므로 checked 가 "true" 일 경우 삭제한다.
     * 5. 로그인할 때 마다 알림이 있을 경우 전송하기 vs 유저 프로필 버튼을 누르면 getMapping 으로 notification 남은 애들 전송하기
     */

    public List<Notification> findAllNotificationByMember(HttpServletRequest request) { // 알림 전체 불러오기
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = jwtTokenProvider.getPayloadSub(token);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new MemberException(MemberErrorMessage.USER_NOT_FOUND));

        return notificationRepository.findAllByMember(member);
    }

    public Notification readNotification(Long notificationId) { // 알림 읽기
        return notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ScheduleException(ALREADY_DELETED_ALARM));
    }

    public void deleteNotification(Long notificationId) { // 알림 삭제
        notificationRepository.deleteById(notificationId);
    }
}
