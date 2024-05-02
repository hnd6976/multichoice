package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.abe.models.Exam;
import com.app.abe.models.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {
	Optional<Subject> findByName(String name);
	Optional<Subject> findById(Short id);
	@Query("SELECT e FROM Subject e WHERE e.grade.id=?1")
	List<Subject> findByGradeId(Integer id);
}