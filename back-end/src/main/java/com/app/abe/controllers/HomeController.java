package com.app.abe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.abe.models.Answer;
import com.app.abe.models.Question;
import com.app.abe.request.LoginRequest;
import com.app.abe.request.QuestionRequest;
import com.app.abe.services.AnswerService;
import com.app.abe.services.QuestionService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@RestController
@RequestMapping("/api/home")
public class HomeController {
	@Autowired 
	private AnswerService answerService;
	@Autowired
	private QuestionService questionService;
	
	//@GetMapping("/test")
	//public String addNewQuestions(@Valid @RequestBody QuestionRequest questionRequest) {
	//	return questionService.addQuestion(questionRequest.getContent(),questionRequest.getAnswers(), questionRequest.getTrueIndex());
	//}
}
