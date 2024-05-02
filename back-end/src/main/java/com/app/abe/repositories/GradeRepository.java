package com.app.abe.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.abe.models.Exam;
import com.app.abe.models.Grade;


public interface GradeRepository extends JpaRepository<Grade, Integer> {
	Optional<Grade> findByName(String name);
	Optional<Grade> findById(Integer id);

}
