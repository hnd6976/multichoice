package com.app.abe.services;

import java.time.Duration;
import java.util.List;

import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import com.app.abe.models.Notification;
import com.app.abe.repositories.NotificationRepository;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

@Service
@Slf4j
public class PushNotificationService {
    private final NotificationRepository notificationRepository;
    public PushNotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    private List<Notification> getNotifs() {
        var notifs = notificationRepository.findAll();
        notifs.forEach(x -> x.setDelivered(true));
        notificationRepository.saveAll(notifs);
        return notifs;
    }
    public Flux<ServerSentEvent<List<Notification>>> getNotifications() {
            return Flux.interval(Duration.ofSeconds(1))
                    .publishOn(Schedulers.boundedElastic())
                    .map(sequence -> ServerSentEvent.<List<Notification>>builder().id(String.valueOf(sequence))
                            .event("user-list-event").data(getNotifs())
                            .build());
    }
}