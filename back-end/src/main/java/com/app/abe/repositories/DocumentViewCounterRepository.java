package com.app.abe.repositories;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Answer;
import com.app.abe.models.DocumentViewCounter;

@Repository
public interface DocumentViewCounterRepository extends JpaRepository<DocumentViewCounter, Long> {
	//Optional<Answer> findByValue(String value);
	Optional<DocumentViewCounter> findById(Long id);
	Optional<DocumentViewCounter> findByDay(Date date);
	@Query("SELECT DISTINCT YEAR(day) FROM DocumentViewCounter")
	List<Integer> getListYear();
	@Query("SELECT DISTINCT MONTH(day) FROM DocumentViewCounter WHERE YEAR(day)=?1 ")
	List<Integer> getListMonth(Integer year);
	@Query("SELECT DISTINCT DAY(day) FROM DocumentViewCounter WHERE YEAR(day)=?1 AND MONTH(day)=?2")
	List<Integer> getListDay(Integer year,Integer month);
	@Query("SELECT d FROM DocumentViewCounter d WHERE d.document.id=?1 ORDER BY day DESC LIMIT 1 ")
	Optional<DocumentViewCounter> findNearByDocumentId(Integer id);
	@Query("SELECT SUM(count) FROM DocumentViewCounter")
	Long getAllCount();
	@Query("SELECT DAY(day), SUM(count) FROM DocumentViewCounter WHERE YEAR(day)=?1 AND MONTH(day)=?2  GROUP BY DAY(day)")
	List<Object> getCountDay(Integer year,Integer Month);
	@Query("SELECT MONTH(day), SUM(count) FROM DocumentViewCounter WHERE YEAR(day)=?1  GROUP BY MONTH(day)")
	List<Object> getCountMonth(Integer year);
	@Query("SELECT YEAR(day), SUM(count) FROM DocumentViewCounter  GROUP BY YEAR(day)")
	List<Object> getCountYear();
	@Query("SELECT d.document.name,SUM(count) FROM DocumentViewCounter d GROUP BY d.document.name ORDER BY SUM(count)  DESC LIMIT 5")
	List<Object> getTopViewAll();
	@Query("SELECT d.document.name,SUM(count) FROM DocumentViewCounter d WHERE YEAR(day)=?1 "
			+ "GROUP BY d.document.name ORDER BY SUM(count)  DESC LIMIT 5")
	List<Object> getTopViewYear(Integer year);
	@Query("SELECT d.document.name,SUM(count) FROM DocumentViewCounter d WHERE YEAR(day)=?1 AND MONTH(day)=?2 "
			+ "GROUP BY d.document.name ORDER BY SUM(count)  DESC LIMIT 5")
	List<Object> getTopViewMonth(Integer year,Integer month);
	@Query("SELECT d.document.name,SUM(count) FROM DocumentViewCounter d WHERE YEAR(day)=?1 AND MONTH(day)=?2 "
			+ "AND DAY(day)=?3 "
			+ "GROUP BY d.document.name ORDER BY SUM(count)  DESC LIMIT 5")
	List<Object> getTopViewDay(Integer year,Integer month,Integer day);
}
