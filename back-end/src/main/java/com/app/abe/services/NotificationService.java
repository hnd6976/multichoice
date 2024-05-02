package com.app.abe.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.abe.models.Notification;
import com.app.abe.repositories.NotificationRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class NotificationService {

    private final NotificationRepository notifRepository;

    public NotificationService(NotificationRepository notifRepository) {
        this.notifRepository = notifRepository;
    }

    public Notification createNotification(Notification notificationStorage) {
        return notifRepository.save(notificationStorage);
    }


    public Notification getNotificationsByID(Long id) {
        return notifRepository.findById(id).orElseThrow(() -> new RuntimeException("notification not found!"));
    }

    public List<Notification> getNotificationsNotRead() {
        return notifRepository.findByDeliveredFalse();
    }


    public List<Notification> getNotifications() {
        return notifRepository.findAll();
    }
    public Notification changeNotifStatusToRead(Long notifID) {
        var notif = notifRepository.findById(notifID)
                .orElseThrow(() -> new RuntimeException("not found!"));
        notif.setRead(true);
        return notifRepository.save(notif);
    }

    public void clear() {
        notifRepository.deleteAll();
    }
}