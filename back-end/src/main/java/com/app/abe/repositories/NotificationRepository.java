package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Answer;
import com.app.abe.models.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
	//Optional<Answer> findByValue(String value);
	Optional<Notification> findById(Long id);
	List<Notification> findByUserId(Long id);
	@Query("SELECT n FROM Notification n WHERE n.delivered=false")
	 List<Notification> findByDeliveredFalse();
}

