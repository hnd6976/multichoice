package com.app.abe.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.app.abe.models.Document;
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.Transaction;
import com.app.abe.repositories.DocumentRepository;
import com.app.abe.repositories.TransactionRepository;

@Service
public class TransactionService {
	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private DocumentRepository documentRepository;
	public Optional<Transaction> findById(String id) {
		return transactionRepository.findById(id);
	}
	public List<Transaction> getAll(){
	return transactionRepository.findAll();
	}
	public Long getAllCount() {
		return transactionRepository.getAllDownloadedCount();
	}
	public List<Object> getCountDay(int year,int month) {
		return transactionRepository.getDownloadedDay(year,month);
	}
	public List<Object> getCountMonth(int year) {
		return transactionRepository.getDownloadedMonth(year);
	}
	public List<Object> getCountYear() {
		return transactionRepository.getDownloadedYear();
	}
	
	public Long getAllRevenue() {
		return transactionRepository.getAllRevenueCount();
	}
	public List<Object> getRevenueDay(int year,int month) {
		return transactionRepository.getRevenueDay(year,month);
	}
	public List<Object> getRevenueMonth(int year) {
		return transactionRepository.getRevenueMonth(year);
	}
	public List<Object> getRevenueYear() {
		return transactionRepository.getRevenueYear();
	}
	/*
	public void increaseDownloaded(Integer documentId) {
		LocalDate localDate = LocalDate.now();
		Date date= Date.valueOf(localDate);
		DocumentDownloadedCounter documentDownloadedCounter= documentDownloadedCounterRepository.findNearByDocumentId(documentId).orElse(null);
		if(documentDownloadedCounter!=null) {
			//System.out.print(documentDownloadedCounter.getDay());
			if(documentDownloadedCounter.getDay().equals(date)) {
				documentDownloadedCounter.setCount(documentDownloadedCounter.getCount()+1);
				documentDownloadedCounterRepository.save(documentDownloadedCounter);
			}else {
				DocumentDownloadedCounter newDocumentDownloadedCounter=new DocumentDownloadedCounter();
				newDocumentDownloadedCounter.setCount((long) 1);
				newDocumentDownloadedCounter.setDay(date);
				Document document =documentRepository.findById(documentId).orElse(null);
				if(document!=null) {
					newDocumentDownloadedCounter.setDocument(document);
				}
				documentDownloadedCounterRepository.save(newDocumentDownloadedCounter);
			}
		}else {
			DocumentDownloadedCounter newDocumentDownloadedCounter=new DocumentDownloadedCounter();
			newDocumentDownloadedCounter.setCount((long) 1);
			newDocumentDownloadedCounter.setDay(date);
			Document document =documentRepository.findById(documentId).orElse(null);
			if(document!=null) {
				newDocumentDownloadedCounter.setDocument(document);
			}
			documentDownloadedCounterRepository.save(newDocumentDownloadedCounter);
		}
		//System.out.print(documentDownloadedCounter.getId());
	}*/
	public List<Object> getTopDownloadedAll() {
		return transactionRepository.getTopDownloadedAll();
	}
	public List<Object> getTopDownloadedYear(Integer year) {
		return transactionRepository.getTopDownloadedYear(year);
	}
	public List<Object> getTopDownloadedMonth(Integer year,Integer month) {
		return transactionRepository.getTopDownloadedMonth(year, month);
	}
	public List<Object> getTopDownloadedDay(Integer year,Integer month,Integer day) {
		return transactionRepository.getTopDownloadedDay(year,month,day);
	}
	
	public List<Object> getTopRevenueAll() {
		return transactionRepository.getTopRevenueAll();
	}
	public List<Object> getTopRevenueYear(Integer year) {
		return transactionRepository.getTopRevenueYear(year);
	}
	public List<Object> getTopRevenueMonth(Integer year,Integer month) {
		return transactionRepository.getTopRevenueMonth(year, month);
	}
	public List<Object> getTopRevenueDay(Integer year,Integer month,Integer day) {
		return transactionRepository.getTopRevenueDay(year,month,day);
	}
	
	public List<Integer> getListYear(){
		return transactionRepository.getListYear();
	}
	public List<Integer> getListMonth(Integer year){
		return transactionRepository.getListMonth(year);
	}
	public List<Integer> getListDay(Integer year,Integer month){
		return transactionRepository.getListDay(year, month);
	}
	public PageData<Transaction> getByDocumentId(Integer id,Integer pageNum,Integer pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Transaction> pagedResult=transactionRepository.findByDocumentId(id, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Transaction> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Transaction> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	public PageData<Transaction> getByUserId(Long id,Integer pageNum,Integer pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Transaction> pagedResult=transactionRepository.findByUserId(id, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Transaction> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Transaction> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
}
