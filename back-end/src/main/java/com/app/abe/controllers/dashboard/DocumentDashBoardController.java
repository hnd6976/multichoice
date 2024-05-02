package com.app.abe.controllers.dashboard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.DocumentViewCounter;
import com.app.abe.services.DocumentService;
import com.app.abe.services.DocumentViewCounterService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/dashboard/document")
public class DocumentDashBoardController {
	@Autowired
	private DocumentService documentService;
	@Autowired
	private DocumentViewCounterService documentViewCounterService;
	@GetMapping("/getAll")
	public List<DocumentViewCounter> getAll() {
		return documentViewCounterService.getAll(); 
		
	}
	@GetMapping("/getAllCount")
	public Integer getAllCount() {
		return documentService.getAllCount(); 
		
	}
	@GetMapping("/getAllCountEnabled")
	public Integer getAllCountEnabled() {
		return documentService.getAllCountEnabled(); 
		
	}
	@GetMapping("/getAllViews")
	public Long getAllViews() {
		return documentViewCounterService.getAllCount(); 
		
	}
	@GetMapping("/getViewsDay/{year}/{month}")
	public List<Object> getViewsDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		return documentViewCounterService.getCountDay(year,month); 
		
	}
	@GetMapping("/getViewsMonth/{year}")
	public List<Object> getViewsMonth(@PathVariable("year") int year) {
		return documentViewCounterService.getCountMonth(year); 
		
	}
	@GetMapping("/getViewsYear")
	public List<Object> getViewsYear() {
		return documentViewCounterService.getCountYear(); 
		
	}
	
	@GetMapping("/getTopViewAll")
	public List<Object> getTopViewAll() {
		 return documentViewCounterService.getTopViewAll() ;
		
	}
	@GetMapping("/getTopViewYear/{year}")
	public List<Object> getTopViewYear(@PathVariable("year") int year) {
		 return documentViewCounterService.getTopViewYear(year);
	}
	@GetMapping("/getTopViewMonth/{year}/{month}")
	public List<Object> getTopViewYear(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return documentViewCounterService.getTopViewMonth(year,month);
		
	}
	@GetMapping("/getTopViewDay/{year}/{month}/{day}")
	public List<Object> getTopViewYear(@PathVariable("year") int year,@PathVariable("month") int month,
			@PathVariable("day") int day
			) {
		 return documentViewCounterService.getTopViewDay(year,month,day);
		
	}
	@GetMapping("/getListYear")
	public List<Integer> getListYear() {
		 return documentViewCounterService.getListYear();
	}
	@GetMapping("/getListMonth/{year}")
	public List<Integer> getListMonth(@PathVariable("year") int year) {
		 return documentViewCounterService.getListMonth(year);
		
	}
	@GetMapping("/getListDay/{year}/{month}")
	public List<Integer> getListDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return documentViewCounterService.getListDay(year,month);
		
	}
}
