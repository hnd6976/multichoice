package com.app.abe.controllers.dashboard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.Transaction;
import com.app.abe.services.DocumentService;
import com.app.abe.services.TransactionService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/dashboard/transaction")
public class TransactionDashBoardController {
	@Autowired
	private DocumentService documentService;
	@Autowired
	private TransactionService transactionService;
	@GetMapping("/getAllDownloadeds")
	public Long getAllDownloadeds() {
		return transactionService.getAllCount(); 
		
	}
	@GetMapping("/getDownloadedDay/{year}/{month}")
	public List<Object> getDownloadedsDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		return transactionService.getCountDay(year,month); 
		
	}
	@GetMapping("/getDownloadedMonth/{year}")
	public List<Object> getDownloadedsMonth(@PathVariable("year") int year) {
		return transactionService.getCountMonth(year); 
		
	}
	@GetMapping("/getDownloadedYear")
	public List<Object> getDownloadedsYear() {
		return transactionService.getCountYear(); 
		
	}
	
	@GetMapping("/getAllRevenue")
	public Long getAllRevenue() {
		return transactionService.getAllRevenue(); 
		
	}
	@GetMapping("/getRevenueDay/{year}/{month}")
	public List<Object> getRevenueDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		return transactionService.getRevenueDay(year,month); 
		
	}
	@GetMapping("/getRevenueMonth/{year}")
	public List<Object> getRevenueMonth(@PathVariable("year") int year) {
		return transactionService.getRevenueMonth(year); 
		
	}
	@GetMapping("/getRevenueYear")
	public List<Object> getRevenueYear() {
		return transactionService.getRevenueYear(); 
		
	}
	/*@GetMapping("/increase/{id}")
	public void increase(@PathVariable("id") Integer documentId) {
		 transactionService.increaseDownloaded(documentId); 
		
	}*/
	@GetMapping("/getTopDownloadedAll")
	public List<Object> getTopDownloadedAll() {
		 return transactionService.getTopDownloadedAll() ;
	}
	@GetMapping("/getTopDownloadedYear/{year}")
	public List<Object> getTopDownloadedYear(@PathVariable("year") int year) {
		 return transactionService.getTopDownloadedYear(year);
	}
	@GetMapping("/getTopDownloadedMonth/{year}/{month}")
	public List<Object> getTopDownloadedYear(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return transactionService.getTopDownloadedMonth(year,month);
		
	}
	@GetMapping("/getTopDownloadedDay/{year}/{month}/{day}")
	public List<Object> getTopDownloadedYear(@PathVariable("year") int year,@PathVariable("month") int month,
			@PathVariable("day") int day
			) {
		 return transactionService.getTopDownloadedDay(year,month,day);
		
	}
	
	@GetMapping("/getTopRevenueAll")
	public List<Object> getTopRevenueAll() {
		 return transactionService.getTopRevenueAll() ;
	}
	@GetMapping("/getTopRevenueYear/{year}")
	public List<Object> getTopRevenueYear(@PathVariable("year") int year) {
		 return transactionService.getTopRevenueYear(year);
	}
	@GetMapping("/getTopRevenueMonth/{year}/{month}")
	public List<Object> getTopRevenueYear(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return transactionService.getTopRevenueMonth(year,month);
		
	}
	@GetMapping("/getTopRevenueDay/{year}/{month}/{day}")
	public List<Object> getTopRevenueYear(@PathVariable("year") int year,@PathVariable("month") int month,
			@PathVariable("day") int day
			) {
		 return transactionService.getTopRevenueDay(year,month,day);
		
	}
	
	@GetMapping("/getListYear")
	public List<Integer> getListYear() {
		 return transactionService.getListYear();
	}
	@GetMapping("/getListMonth/{year}")
	public List<Integer> getListMonth(@PathVariable("year") int year) {
		 return transactionService.getListMonth(year);
		
	}
	@GetMapping("/getListDay/{year}/{month}")
	public List<Integer> getListDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return transactionService.getListDay(year,month);
		
	}
}
