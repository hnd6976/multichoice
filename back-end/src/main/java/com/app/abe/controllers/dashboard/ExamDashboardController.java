package com.app.abe.controllers.dashboard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.app.abe.models.ExamCompleted;
import com.app.abe.request.ExamCompletedRequest;
import com.app.abe.services.DocumentService;
import com.app.abe.services.ExamCompletedService;
import com.app.abe.services.ExamService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/dashboard/exam")
public class ExamDashboardController {
	@Autowired
	private ExamCompletedService examCompletedService;
	@Autowired
	private ExamService examService;
	@GetMapping("/getAllCountExam")
	public Integer getAllCountExam() {
		return  examService.getAllCount();
	}
	@GetMapping("/getAllCountExamEnabled")
	public Integer getAllCompletedEnabledExam() {
		return  examService.getAllCountEnabled();
	}
	@GetMapping("/getAllCountCompleted")
	public Long getAllCompletedCompleted() {
		return  examCompletedService.getAllCompleted();
	}
	@GetMapping("/getCompletedYear")
	public List<Object> getCompletedYear() {
		return  examCompletedService.getCompletedYear();
	}
	@GetMapping("/getCompletedMonth/{year}")
	public List<Object> getCompletedMonth(@PathVariable("year") Integer year) {
		return  examCompletedService.getCompletedMonth(year);
	}
	@GetMapping("/getCompletedDay/{year}/{month}")
	public List<Object> getCompletedMonth(@PathVariable("year") Integer year,@PathVariable("month") Integer month) {
		return  examCompletedService.getCompletedDay(year,month);
	}
	@GetMapping("/getTopCompletedAll")
	public List<Object> getTopCompletedAll() {
		 return examCompletedService.getTopCompletedAll();
	}
	@GetMapping("/getTopCompletedYear/{year}")
	public List<Object> getTopCompletedYear(@PathVariable("year") Integer year) {
		 return examCompletedService.getTopCompletedYear(year);
	}
	@GetMapping("/getTopCompletedMonth/{year}/{month}")
	public List<Object> getTopCompletedMonth(@PathVariable("year") Integer year,@PathVariable("month") Integer month) {
		 return examCompletedService.getTopCompletedMonth(year,month);
	}
	@GetMapping("/getTopCompletedDay/{year}/{month}/{day}")
	public List<Object> getTopCompletedDay(@PathVariable("year") Integer year,@PathVariable("month") Integer month,
			@PathVariable("day") Integer day) {
		 return examCompletedService.getTopCompletedDay(year,month,day);
	}
	@GetMapping("/getListYear")
	public List<Integer> getListYear() {
		 return examCompletedService.getListYear();
	}
	@GetMapping("/getListMonth/{year}")
	public List<Integer> getListMonth(@PathVariable("year") int year) {
		 return examCompletedService.getListMonth(year);
		
	}
	@GetMapping("/getListDay/{year}/{month}")
	public List<Integer> getListDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return examCompletedService.getListDay(year,month);
		
	}
	@GetMapping("/init")
	public void init() {
		 examCompletedService.init();
		
	}
}
