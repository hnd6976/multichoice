package com.app.abe.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.DocumentViewCounter;
import com.app.abe.models.Exam;
import com.app.abe.models.ExamCompleted;

@Repository
public interface ExamCompletedRepository extends JpaRepository<ExamCompleted, Long> {
	@Query("SELECT e FROM ExamCompleted e WHERE e.exam.id=?1")
	Page<ExamCompleted> findByExamId(Integer id,Pageable paging);
	@Query("SELECT e FROM ExamCompleted e WHERE e.user.id=?1")
	Page<ExamCompleted> findByUserId(Long id,Pageable paging);
	@Query("SELECT e FROM ExamCompleted e WHERE e.exam.id=?1")
	List<ExamCompleted> findByExamId(Integer id);
	@Query("SELECT DISTINCT YEAR(day) FROM ExamCompleted ORDER BY YEAR(day)")
	List<Integer> getListYear();
	@Query("SELECT DISTINCT MONTH(day) FROM ExamCompleted WHERE YEAR(day)=?1 ORDER BY MONTH(day)")
	List<Integer> getListMonth(Integer year);
	@Query("SELECT DISTINCT DAY(day) FROM ExamCompleted WHERE YEAR(day)=?1 AND MONTH(day)=?2 ORDER BY DAY(day)")
	List<Integer> getListDay(Integer year,Integer month);
	@Query("SELECT COUNT(*) FROM ExamCompleted")
	Long getAllCompletedCount();
	@Query("SELECT YEAR(day),COUNT(*) FROM ExamCompleted GROUP BY YEAR(day)")
	List<Object> getCompletedYear();
	@Query("SELECT MONTH(day),COUNT(*) FROM ExamCompleted WHERE YEAR(day)=?1 GROUP BY MONTH(day)")
	List<Object> getCompletedMonth(Integer year);
	@Query("SELECT DAY(day),COUNT(*) FROM ExamCompleted WHERE YEAR(day)=?1 AND MONTH(day)=?2 GROUP BY DAY(day)")
	List<Object> getCompletedDay(Integer year,Integer month);
	@Query("SELECT e.exam.title,COUNT(*),(AVG(e.correctAnswers)),e.exam FROM ExamCompleted e GROUP BY e.exam.title ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopCompletedAll();
	@Query("SELECT e.exam.title,COUNT(*),(AVG(e.correctAnswers)),e.exam FROM ExamCompleted e WHERE YEAR(day)=?1 GROUP BY e.exam.title ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopCompletedYear(Integer year);
	@Query("SELECT e.exam.title,COUNT(*),(AVG(e.correctAnswers)),e.exam FROM ExamCompleted e WHERE YEAR(day)=?1 AND MONTH(day)=?2"
			+ " GROUP BY e.exam.title ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopCompletedMonth(Integer year,Integer month);
	@Query("SELECT e.exam.title,COUNT(*),(AVG(e.correctAnswers)),e.exam FROM ExamCompleted e WHERE YEAR(day)=?1 AND MONTH(day)=?2 AND DAY(day)=?3"
			+ " GROUP BY e.exam.title ORDER BY COUNT(*)  DESC LIMIT 5")
	List<Object> getTopCompletedDay(Integer year,Integer month,Integer day);
}
