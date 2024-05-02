package com.app.abe.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.Grade;
import com.app.abe.models.Subject;
import com.app.abe.services.GradeService;
import com.app.abe.services.SubjectService;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/subject")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;
	@GetMapping("/getByGradeId/{id}")
	public List<Subject> getByGradeId(@PathVariable int id){
		return subjectService.getByGradeId(id);
	}
}

