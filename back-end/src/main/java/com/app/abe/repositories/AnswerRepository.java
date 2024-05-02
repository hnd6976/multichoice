package com.app.abe.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.app.abe.models.Answer;
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
	//Optional<Answer> findByValue(String value);
	Optional<Answer> findById(Long id);
}
