package com.BE.TWT.service.function;

import com.BE.TWT.config.JwtTokenProvider;
import com.BE.TWT.model.entity.function.Notification;
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

@Component
@RequiredArgsConstructor
@Slf4j
public class ScheduleNotification {
    private final NotificationRepository notificationRepository;
    private final ScheduleRepository scheduleRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    public static Map<Long, SseEmitter> sseEmitters = new ConcurrentHashMap<>();


    @Scheduled(cron = "5 * * * * ?", zone = "Asia/Seoul")
    public void example() {
        log.info("스케줄 알리미");
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

        // 종료 날짜 알림 TODO 종료는 23:59 로 다시 만들어야될지도?
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
}
