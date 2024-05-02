package com.app.abe.controllers.exam;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.abe.services.ExamCompletedService;
import com.app.abe.services.ExamService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.validation.Valid;

import com.app.abe.models.Comment;
import com.app.abe.models.Exam;
import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.request.CommentRequest;
import com.app.abe.request.ExamFilterRequest;
import com.app.abe.request.ExamRequest;
@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/exam")
public class ExamController {
	@Autowired
	private ExamService examService;
	
	@Autowired
	private ExamCompletedService examCompletedService;
	@GetMapping(value="/getAll/{gradeId}/{subjectId}/{page}/{size}",produces = { "application/json" })
	public PageData<Exam> getAll(@PathVariable("gradeId") int gradeId,@PathVariable("subjectId") int subjectId,
			@RequestParam(value = "key", required = false) String key,@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		return  examService.getAllEnabled(gradeId,subjectId, key, pageNum, pageSize);
	}
	@GetMapping("/getById/{id}")
	public Exam getById(@PathVariable Integer id){
		return examService.getById(id).orElseThrow();
	}
	
	@PostMapping("/addComment")
	public Comment getById(@Valid @RequestBody CommentRequest commentRequest){
		return examService.addComment(commentRequest);
	}
	
}

