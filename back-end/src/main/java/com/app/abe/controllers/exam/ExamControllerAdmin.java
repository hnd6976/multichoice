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

import com.app.abe.models.Exam;
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.request.ExamFilterRequest;
import com.app.abe.request.ExamRequest;
import com.app.abe.request.MultiExamRequest;
@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/exam")
public class ExamControllerAdmin {
	@Autowired
	private ExamService examService;
	@Autowired
	private ExamCompletedService examCompletedService;
	@GetMapping(value="/getAll/{gradeId}/{subjectId}/{page}/{size}",produces = { "application/json" })
	public PageData<Exam> getAll(@PathVariable("gradeId") int gradeId,@PathVariable("subjectId") int subjectId,
			@RequestParam(value = "key", required = false) String key,@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		return  examService.getAll(gradeId,subjectId, key, pageNum, pageSize);
		/*ExamFilterRequest examFilterRequest =dataFilter;
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			examFilterRequest= objectMapper.readValue(dataFilter, ExamFilterRequest.class);
		}catch(Exception e) {
			System.out.print(e.getMessage());
		}
		System.out.print(examFilterRequest.getKey());
		if(examFilterRequest.getSubject()!=0) {
			List<Exam> list= examService.getBySubjectId(examFilterRequest.getSubject());
			if(examFilterRequest.getKey()!="") {
				List<Exam> result = list.stream()          
		                .filter(e -> e.getTitle().contains(examFilterRequest.getKey()))
		                .collect(Collectors.toList());
			return result;
			}
			else
				return list;
		}else {
			if(examFilterRequest.getGrade()!=0) {
				List<Exam> list= examService.getByGradeId(examFilterRequest.getGrade());
				if(examFilterRequest.getKey()!="") {
					List<Exam> result = list.stream()          
			                .filter(e -> e.getTitle().contains(examFilterRequest.getKey()))
			                .collect(Collectors.toList());
				return result;
				}
				else
					return list;
			}
		}
		List<Exam> list=examService.getAll();
		if(examFilterRequest.getKey()!="") {
			List<Exam> result = list.stream()          
	                .filter(e -> e.getTitle().contains(examFilterRequest.getKey()))
	                .collect(Collectors.toList());
		return result;
		}
		else
			return list;*/
	}
	/*@GetMapping("/getBySubjectId/{id}")
	public List<Exam> getBySubjectId(@PathVariable Integer id){
		return examService.getBySubjectId(id);
	}
	@GetMapping("/getByGradeId/{id}")
	public List<Exam> getByGradeId(@PathVariable Integer id){
		return examService.getByGradeId(id);
	}*/
	@GetMapping("/getById/{id}")
	public Exam getById(@PathVariable Integer id){
		return examService.getById(id).orElseThrow();
	}
	@GetMapping("/getExamCompletedByExamId/{id}/{page}/{size}")
	public PageData<ExamCompleted> getExamCompletedByExamId(@PathVariable Integer id,@PathVariable("page") Integer pageNum, @PathVariable("size") Integer pageSize){
		return examCompletedService.getByExamId(id, pageNum, pageSize);
	}
	@PostMapping(value="/add",produces = { "application/json" })
	public ResponseEntity<ResponseObject> addExam(@RequestParam("exam") String exam){
		ExamRequest exam1 =new ExamRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			exam1= objectMapper.readValue(exam, ExamRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","nôn", ""));
		}
	
			//System.out.print(exam1.getTitle());
			return examService.addExam(exam1);

	}
	@PostMapping(value="/edit/{id}",produces = { "application/json" })
	public ResponseEntity<ResponseObject> editExam(@PathVariable Integer id,@RequestParam("exam") String exam){
		ExamRequest exam1 =new ExamRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			exam1= objectMapper.readValue(exam, ExamRequest.class);
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
		try {
			System.out.print(exam1);
			return examService.editExam(id, exam1);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error",e.getMessage(), ""));
		}
	}
	@PostMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") int id){
        return examService.deleteExam(id);
    }
	@PostMapping("/setState/{id}")
    public ResponseEntity<?> setState(@PathVariable("id") int id){
        return examService.setState(id);
    }
	@PostMapping(value="/addMulti",produces = { "application/json" })
	public ResponseEntity<ResponseObject> addMultiExam(@RequestParam("exam") String exam){
		MultiExamRequest exam1 =new MultiExamRequest();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			exam1= objectMapper.readValue(exam, MultiExamRequest.class);
			
		}catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Đã xảy ra lỗi !", ""));
		}
	
		
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Tạo đề trắc nghiệm thành công",examService.addMultiExam(exam1)));
			
		}catch(Exception e) {
			System.out.print(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Đã xảy ra lỗi !", ""));
		}
	}
}
