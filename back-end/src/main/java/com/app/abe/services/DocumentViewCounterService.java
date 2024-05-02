package com.app.abe.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.abe.models.Document;
import com.app.abe.models.DocumentViewCounter;
import com.app.abe.repositories.DocumentRepository;
import com.app.abe.repositories.DocumentViewCounterRepository;

@Service
public class DocumentViewCounterService {
	@Autowired
	private DocumentViewCounterRepository documentViewCounterRepository;
	@Autowired
	private DocumentRepository documentRepository;
	public Optional<DocumentViewCounter> findById(Long id) {
		return documentViewCounterRepository.findById(id);
	}
	public List<DocumentViewCounter> getAll(){
	return documentViewCounterRepository.findAll();
	}
	public Long getAllCount() {
		return documentViewCounterRepository.getAllCount();
	}
	public List<Object> getCountDay(int year,int month) {
		return documentViewCounterRepository.getCountDay(year,month);
	}
	public List<Object> getCountMonth(int year) {
		return documentViewCounterRepository.getCountMonth(year);
	}
	public List<Object> getCountYear() {
		return documentViewCounterRepository.getCountYear();
	}
	public void increaseView(Integer documentId) {
		LocalDate localDate = LocalDate.now();
		Date date= Date.valueOf(localDate);
		DocumentViewCounter documentViewCounter= documentViewCounterRepository.findNearByDocumentId(documentId).orElse(null);
		if(documentViewCounter!=null) {
			//System.out.print(documentViewCounter.getDay());
			if(documentViewCounter.getDay().equals(date)) {
				documentViewCounter.setCount(documentViewCounter.getCount()+1);
				documentViewCounterRepository.save(documentViewCounter);
			}else {
				DocumentViewCounter newDocumentViewCounter=new DocumentViewCounter();
				newDocumentViewCounter.setCount((long) 1);
				newDocumentViewCounter.setDay(date);
				Document document =documentRepository.findById(documentId).orElse(null);
				if(document!=null) {
					newDocumentViewCounter.setDocument(document);
				}
				documentViewCounterRepository.save(newDocumentViewCounter);
			}
		}else {
			DocumentViewCounter newDocumentViewCounter=new DocumentViewCounter();
			newDocumentViewCounter.setCount((long) 1);
			newDocumentViewCounter.setDay(date);
			Document document =documentRepository.findById(documentId).orElse(null);
			if(document!=null) {
				newDocumentViewCounter.setDocument(document);
			}
			documentViewCounterRepository.save(newDocumentViewCounter);
		}
		//System.out.print(documentViewCounter.getId());
	}
	public List<Object> getTopViewAll() {
		return documentViewCounterRepository.getTopViewAll();
	}
	public List<Object> getTopViewYear(Integer year) {
		return documentViewCounterRepository.getTopViewYear(year);
	}
	public List<Object> getTopViewMonth(Integer year,Integer month) {
		/*List<Document> list = documentRepository.findAll();
		int i;
		for(i=730;i>=1;i--) {
			final long j=i;
			list.forEach(e->{
				LocalDate localDate = LocalDate.now().minusDays((long) j);
				Date date= Date.valueOf(localDate);
				DocumentViewCounter newDocumentViewCounter=new DocumentViewCounter();
				Random rnd = new Random();
		        int number = rnd.nextInt(999);
				newDocumentViewCounter.setCount((long) number);
				newDocumentViewCounter.setDay(date);
				newDocumentViewCounter.setDocument(e);
				documentViewCounterRepository.save(newDocumentViewCounter);
			});
		}*/
		
		return documentViewCounterRepository.getTopViewMonth(year, month);
	}
	public List<Object> getTopViewDay(Integer year,Integer month,Integer day) {
		return documentViewCounterRepository.getTopViewDay(year,month,day);
	}
	public List<Integer> getListYear(){
		return documentViewCounterRepository.getListYear();
	}
	public List<Integer> getListMonth(Integer year){
		return documentViewCounterRepository.getListMonth(year);
	}
	public List<Integer> getListDay(Integer year,Integer month){
		return documentViewCounterRepository.getListDay(year, month);
	}
}
