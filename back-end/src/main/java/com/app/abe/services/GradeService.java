package com.app.abe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.abe.models.Grade;
import com.app.abe.repositories.GradeRepository;

@Service
public class GradeService {
	@Autowired
	private GradeRepository gradeRepository;
	public List<Grade> getAll(){
		return gradeRepository.findAll();
	}
}
