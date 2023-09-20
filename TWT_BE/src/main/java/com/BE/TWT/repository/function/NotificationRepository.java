package com.BE.TWT.repository.function;

import com.BE.TWT.model.entity.function.Notification;
import com.BE.TWT.model.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Optional<Notification> findById(Long id);

    List<Notification> findAllByMember(Member member);

    @Modifying
    @Query("DELETE FROM Notification n WHERE n.id = :notificationId")
    void deleteById(@Param("notificationId") Long id);
}
