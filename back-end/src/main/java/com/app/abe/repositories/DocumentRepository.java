package com.app.abe.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Document;
import com.app.abe.models.Exam;


@Repository
public interface DocumentRepository extends JpaRepository<Document,Integer>{
	Optional<Document> findByName(String name);
	
	@Query("SELECT d FROM Document d WHERE d.name LIKE %?1%")
	Page<Document> findByKey(String key,Pageable paging);
	@Query("SELECT d FROM Document d WHERE d.subject.id=?1 AND d.name LIKE %?2%")
	Page<Document> findBySubjectId(Integer id,String key,Pageable paging);
	@Query("SELECT d FROM Document d JOIN  d.subject s JOIN s.grade g WHERE g.id=?1 AND d.name LIKE %?2%")
	Page<Document> findByGradeId(Integer id,String key,Pageable paging);
	
	@Query("SELECT d FROM Document d WHERE d.name LIKE %?1% AND d.enabled=true")
	Page<Document> findByKeyEnabled(String key,Pageable paging);
	@Query("SELECT d FROM Document d WHERE d.subject.id=?1 AND d.name LIKE %?2% AND d.enabled=true")
	Page<Document> findBySubjectIdEnabled(Integer id,String key,Pageable paging);
	@Query("SELECT d FROM Document d JOIN  d.subject s JOIN s.grade g WHERE g.id=?1 AND d.name LIKE %?2% AND d.enabled=true")
	Page<Document> findByGradeIdEnabled(Integer id,String key,Pageable paging);
	@Query("SELECT COUNT(*) FROM Document")
	Integer getAllCount();
	@Query("SELECT COUNT(*) FROM Document  WHERE enabled=true")
	Integer getAllCountEnabled();
}

