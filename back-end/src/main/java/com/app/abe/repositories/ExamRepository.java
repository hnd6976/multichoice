package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Exam;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {
	Optional<Exam> findByTitle(String title);
	Optional<Exam> findById(Integer id);
	@Query("SELECT COUNT(*) FROM Exam")
	Integer getAllCount();
	@Query("SELECT COUNT(*) FROM Exam WHERE enabled=true")
	Integer getAllCountEnabled();
	@Query("SELECT e FROM Exam e WHERE e.title LIKE %?1%")
	Page<Exam> findByKey(String key,Pageable paging);
	@Query("SELECT e FROM Exam e WHERE e.subject.id=?1 AND e.title LIKE %?2%")
	Page<Exam> findBySubjectId(Integer id,String key,Pageable paging);
	@Query("SELECT e FROM Exam e JOIN  e.subject s JOIN s.grade g WHERE g.id=?1 AND e.title LIKE %?2%")
	Page<Exam> findByGradeId(Integer id,String key,Pageable paging);
	
	@Query("SELECT e FROM Exam e WHERE e.title LIKE %?1% AND e.enabled=true")
	Page<Exam> findByKeyEnabled(String key,Pageable paging);
	@Query("SELECT e FROM Exam e WHERE e.subject.id=?1 AND e.title LIKE %?2% AND e.enabled=true")
	Page<Exam> findBySubjectIdEnabled(Integer id,String key,Pageable paging);
	@Query("SELECT e FROM Exam e JOIN  e.subject s JOIN s.grade g WHERE g.id=?1 AND e.title LIKE %?2% AND e.enabled=true")
	Page<Exam> findByGradeIdEnabled(Integer id,String key,Pageable paging);
}
