package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Answer;
import com.app.abe.models.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
	Optional<Question> findByHtml(String content);
	Optional<Question> findById(Integer id);
	List<Question> findAll();
	@Query("SELECT q FROM Question q WHERE q.questionCategory.id = ?1 AND q.html LIKE %?2%")
	Page<Question> findByQuestionCategoryIdAndKey(Integer id,String key,Pageable paging);
	@Query("SELECT q FROM Question q WHERE q.html LIKE %?1%")
	Page<Question> findByKey(String key,Pageable paging);
	@Query("SELECT q FROM Question q WHERE q.questionCategory.id = ?1")
	Page<Question> findByQuestionCategoryId(Integer id,Pageable paging);
	@Query("SELECT q FROM Question q WHERE q.questionCategory.id = ?1")
	List<Question> findByQuestionCategoryId(Integer id);
	@Query("SELECT q FROM Question q JOIN  q.questionCategory qc JOIN qc.subject s WHERE s.id=?1 AND q.html LIKE %?2%")
	Page<Question> findBySubjectIdAndKey(Integer id,String key,Pageable paging);
}
