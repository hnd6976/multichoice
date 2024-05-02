package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.abe.models.Question;
import com.app.abe.models.QuestionCategory;

public interface QuestionCategoryRepository extends JpaRepository<QuestionCategory, Integer> {
	Optional<QuestionCategory> findByName(String name);
	Optional<QuestionCategory> findById(Integer id);
	@Query("SELECT q FROM QuestionCategory q WHERE q.subject.id = ?1")
	List<QuestionCategory> findBySubjectId(Integer id);
}
