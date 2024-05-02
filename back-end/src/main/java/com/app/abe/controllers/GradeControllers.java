package com.app.abe.controllers;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.Grade;
import com.app.abe.services.GradeService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/grade")
public class GradeControllers {
	@Autowired
	private GradeService gradeService;
	@GetMapping("/getAll")
	public List<Grade> getAll(){
		return gradeService.getAll();
	}
}
