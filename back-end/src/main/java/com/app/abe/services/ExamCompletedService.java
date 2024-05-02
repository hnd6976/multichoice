package com.app.abe.services;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.abe.models.Exam;
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.User;
import com.app.abe.repositories.ExamCompletedRepository;
import com.app.abe.repositories.ExamRepository;
import com.app.abe.repositories.UserRepository;
import com.app.abe.request.ExamCompletedRequest;
@Service
public class ExamCompletedService {
	@Autowired
	private ExamCompletedRepository examCompletedRepository;
	@Autowired 
	private ExamRepository examRepository;
	@Autowired
	private UserRepository userRepository;
	public ExamCompleted addExamCompleted(ExamCompletedRequest examCompletedRequest) {
		ExamCompleted examCompleted= new ExamCompleted();
		User user = userRepository.findById(examCompletedRequest.getUserId()).orElse(null);
		examCompleted.setUser(user);
		Exam exam = examRepository.findById(examCompletedRequest.getExamId()).orElse(null);
		examCompleted.setExam(exam);
		examCompleted.setCorrectAnswers(examCompletedRequest.getCorrectAnswers());
		examCompleted.setTotalQuestion(exam.getQuestions().size());
		examCompleted.setTime(examCompletedRequest.getTime());
		examCompleted.setDay(new Date());
		examCompletedRepository.save(examCompleted);
		return examCompleted;
	}
	
	public PageData<ExamCompleted> getByExamId(Integer id,Integer pageNum,Integer pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<ExamCompleted> pagedResult=examCompletedRepository.findByExamId(id, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<ExamCompleted> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<ExamCompleted> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	public PageData<ExamCompleted> getByUserId(Long id,Integer pageNum,Integer pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<ExamCompleted> pagedResult=examCompletedRepository.findByUserId(id, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<ExamCompleted> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<ExamCompleted> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	public List<Integer> getListYear(){
		return examCompletedRepository.getListYear();
	}
	public List<Integer> getListMonth(Integer year){
		return examCompletedRepository.getListMonth(year);
	}
	public List<Integer> getListDay(Integer year,Integer month){
		return examCompletedRepository.getListDay(year, month);
	}
	public Long getAllCompleted() {
		return examCompletedRepository.getAllCompletedCount();
	}
	public List<Object> getCompletedYear() {
		return examCompletedRepository.getCompletedYear();
	}
	public List<Object> getCompletedMonth(Integer year) {
		return examCompletedRepository.getCompletedMonth(year);
	}
	public List<Object> getCompletedDay(Integer year,Integer month) {
		return examCompletedRepository.getCompletedDay(year,month);
	}
	public List<Object> getTopCompletedAll() {
		return examCompletedRepository.getTopCompletedAll();
	}
	public List<Object> getTopCompletedYear(Integer year) {
		return examCompletedRepository.getTopCompletedYear(year);
	}
	public List<Object> getTopCompletedMonth(Integer year,Integer month) {
		return examCompletedRepository.getTopCompletedMonth(year,month);
	}
	public List<Object> getTopCompletedDay(Integer year,Integer month,Integer day) {
		return examCompletedRepository.getTopCompletedDay(year,month,day);
	}
	public void init() {
		List<ExamCompleted> list =examCompletedRepository.findAll();
		/*for(int i=0;i<30;i++) {
			Random rnd = new Random();
	        int number = rnd.nextInt(0,17520);
	        Date currentDate = new Date(System.currentTimeMillis() - TimeUnit.HOURS.toMillis(number));
	        System.out.print(currentDate+"\n"+number);
		}*/
		list.forEach(e->{
			
			Random rnd3 = new Random();
	        int number3 = rnd3.nextInt( e.getExam().getTime()*60-180, e.getExam().getTime()*60);
	        e.setTime(number3);
	        examCompletedRepository.save(e);
			/*Random rnd = new Random();
	        int number = rnd.nextInt(0,17520);
	        Date currentDate = new Date(System.currentTimeMillis() - TimeUnit.HOURS.toMillis(number));
	        e.setDay(currentDate);
	        examCompletedRepository.save(e);*/

		});
		/*
		List<Exam> listE = examRepository.findAll();
		List<User> listU=userRepository.findAll();
		int i;
		for(i=730;i>=1;i--) {
			//final int j;
			listE.forEach(e->{
				Random rnd = new Random();
		        int number = rnd.nextInt(45, 90);
		        int j;
		        for(j=1;j<=number;j++) {
		        	//LocalDate localDate = LocalDate.now();
		        	ExamCompleted examCompleted=new ExamCompleted();
					Date date=new Date();
					examCompleted.setDay(date);
					
					Random rnd1 = new Random();
			        int number1 = rnd1.nextInt(0, listU.size()-1);
			        examCompleted.setUser(listU.get(number1));
			        
			        Random rnd3 = new Random();
			        int number3 = rnd3.nextInt(0, e.getQuestions().size());
			        examCompleted.setCorrectAnswers(number3);
			        
			        Random rnd4 = new Random();
			        int number4 = rnd4.nextInt(1, e.getTime());
			        examCompleted.setTime(number4);
			        
			        examCompleted.setExam(e);
			        
			        examCompletedRepository.save(examCompleted);
		        }
				
			});
		}*/
		
	}
	
}
