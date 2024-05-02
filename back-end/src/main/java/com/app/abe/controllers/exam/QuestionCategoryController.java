package com.app.abe.controllers.exam;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.QuestionCategory;
import com.app.abe.services.QuestionCategoryService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/quesCate")
public class QuestionCategoryController {
	@Autowired
	private QuestionCategoryService questionCategoryService;
	@GetMapping("/getBySubjectId/{id}")
	public List<QuestionCategory> getBySubjectId(@PathVariable Integer id){
		return questionCategoryService.getBySubjectId(id);
	}
}
