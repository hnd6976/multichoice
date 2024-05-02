package com.app.abe.controllers.exam;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Pageable;
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

import com.app.abe.models.PageData;
import com.app.abe.models.Question;
import com.app.abe.models.ResponseObject;
import com.app.abe.request.QuestionRequest;
import com.app.abe.services.QuestionService;
import com.fasterxml.jackson.databind.ObjectMapper;


import jakarta.validation.Valid;

//@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/question")
public class QuestionController {
	@Autowired
	private QuestionService questionService;
	@GetMapping("/getAll/{id}/{subId}/{page}/{size}")
	public PageData<Question> getAll(@PathVariable("id") int id,@PathVariable("subId") int subId,@RequestParam(value = "key", required = false) String key,@PathVariable("page") int pageNum, @PathVariable("size") int pageSize)
			
	{
		return questionService.getAll(id,subId,key,pageNum, pageSize);
	}
	/*@GetMapping("/getByCategoryId/{id}")
	public List<Question> getByCategoryId(@PathVariable int id){
		return questionService.getQuestionByCategoryId(id);
	}*/
	@PostMapping(value="/add",produces = { "application/json" })
	public ResponseEntity<ResponseObject> addNewQuestions(@RequestParam("question") String question,
			@RequestParam("imageFile") Optional<MultipartFile> imageFile)throws Exception {
		QuestionRequest question1 =new QuestionRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			question1= objectMapper.readValue(question, QuestionRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
		try {
			return questionService.addQuestion(question1.getJson(),question1.getHtml(),question1.getAnswers(),
					question1.getTrueIndex(),question1.getQuestionCateId(),imageFile);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
}
	
	@PostMapping(value="/edit/{id}",produces = { "application/json" })
	public ResponseEntity<ResponseObject> editQuestion(@RequestParam("question") String question,
			@RequestParam("imageFile")  Optional<MultipartFile> imageFile,
			@PathVariable int id)throws Exception{
		QuestionRequest questionRequest=new QuestionRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			questionRequest= objectMapper.readValue(question, QuestionRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), e.getMessage()));
		}
		try {
			return questionService.editQuestion(id,questionRequest.getJson(),questionRequest.getHtml(),questionRequest.getAnswers(),
					questionRequest.getTrueIndex(),questionRequest.getQuestionCateId(),imageFile);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","", ""));
		}
	}
	
	@PostMapping(value="/delete/{id}",produces = { "application/json" })
	public ResponseEntity<ResponseObject> editQuestion(@PathVariable int id){
		return questionService.deleteQuestion(id);
	}
	
}
