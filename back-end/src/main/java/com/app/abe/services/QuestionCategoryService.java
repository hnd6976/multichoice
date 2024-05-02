package com.app.abe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.abe.models.QuestionCategory;
import com.app.abe.repositories.QuestionCategoryRepository;

@Service
public class QuestionCategoryService {
	@Autowired
	private QuestionCategoryRepository questionCategoryRepository;
	public List<QuestionCategory> getBySubjectId(int id){
		return questionCategoryRepository.findBySubjectId(id);
	}
}
