package com.app.abe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.abe.models.Subject;
import com.app.abe.repositories.SubjectRepository;

@Service
public class SubjectService {
	@Autowired
	private SubjectRepository subjectRepository ;
	public List<Subject> getByGradeId(int id){
		return subjectRepository.findByGradeId(id);
	}
}
