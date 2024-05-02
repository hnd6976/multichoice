package com.app.abe.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.abe.event.listener.RegistrationCompleteEventListener;
import com.app.abe.models.Document;
import com.app.abe.models.Exam;
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.Subject;
import com.app.abe.models.Transaction;
import com.app.abe.models.User;
import com.app.abe.models.Question;
import com.app.abe.models.QuestionCategory;
import com.app.abe.models.ResponseObject;
import com.app.abe.repositories.DocumentRepository;
import com.app.abe.repositories.SubjectRepository;
import com.app.abe.repositories.TransactionRepository;
import com.app.abe.repositories.UserRepository;
import com.app.abe.response.MessageResponse;


@Service
public class DocumentService {
	@Autowired
	private DocumentRepository documentRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private SubjectRepository subjectRepository;
	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private CloudinayImageServiceIml cloudinaryImageServiceIml;
	@Autowired
	private RegistrationCompleteEventListener eventListener;
	public PageData<Document> getAll(Integer gradeId,Integer subjectId,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Document> pagedResult=subjectId!=0?documentRepository.findBySubjectId(subjectId, key, paging):
			gradeId!=0?documentRepository.findByGradeId(gradeId, key, paging):documentRepository.findByKey(key, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Document> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Document> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	
	}
	
	public PageData<Document> getAllEnabled(Integer gradeId,Integer subjectId,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Document> pagedResult=subjectId!=0?documentRepository.findBySubjectIdEnabled(subjectId, key, paging):
			gradeId!=0?documentRepository.findByGradeIdEnabled(gradeId, key, paging):documentRepository.findByKeyEnabled(key, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Document> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Document> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	
	}
	
	public ResponseEntity<ResponseObject> addDocument(String name,Integer subjectId,Float price,Optional<MultipartFile> imageFile)throws Exception{
		try {
			Document doc = documentRepository.findByName(name).orElse(null);
			if(doc!=null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ResponseObject("Error","Tên đã tồn tại",""));
			}
			Document document = new Document();
			document.setName(name);
			document.setPrice(price);
			Subject subject = subjectRepository.findById(subjectId).orElseThrow();
			document.setSubject(subject);
			document.setEnabled(true);
			document.setCreated_at(new Date());
			MultipartFile file = imageFile.orElse(null);
			if(!(file==null)) {
		        Map data=cloudinaryImageServiceIml.upload(file);
				document.setUrl(data.get("public_id").toString());
				documentRepository.save(document);
		    }
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Add successfully",document));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Lỗi", e.getMessage()));
		}
	}
	public ResponseEntity<ResponseObject> editDocument(Integer id,String name,Integer subjectId,Float price,Optional<MultipartFile> imageFile)throws Exception{
		Document doc=documentRepository.findByName(name).orElse(null);
		System.out.print(doc);
		if(doc!=null&&doc.getId()!=id) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Tên đã tồn tại", ""));
		}
		Document document =	documentRepository.findById(id).orElseThrow();
		if(document!=null) {
			document.setName(name);
			document.setPrice(price);
			Subject subject = subjectRepository.findById(subjectId).orElseThrow();
			document.setSubject(subject);
			document.setUpdated_at(new Date());
			MultipartFile file = imageFile.orElse(null);
			if (!(file==null)) {
				if(document.getUrl()!=null) {
					cloudinaryImageServiceIml.destroy(document.getUrl());
				}
				Map data=cloudinaryImageServiceIml.upload(file);
				document.setUrl(data.get("public_id").toString());
			}
			documentRepository.save(document);
			 return ResponseEntity.status(HttpStatus.OK)
						.body(new ResponseObject("Success", "Update successfully",document));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error","Không tìm thấy tài liệu", ""));
		
	}
	public ResponseEntity<?> setState(Integer id){
		Document document = documentRepository.findById(id).orElse(null);
		if(document==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Đã xảy ra lỗi"));
		}
		document.setEnabled(!document.isEnabled());
		documentRepository.save(document);
		if(document.isEnabled()) {
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã mở khóa tài liệu "+document.getName()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã khóa tài liệu "+document.getName()));
	}
	public ResponseEntity<?> deleteDocument(Integer id){
		Document document = documentRepository.findById(id).orElse(null);
		if(document==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Không tìm thấy tài liệu !"));
		}
		List<Transaction> list= transactionRepository.findByDocumentId(id);
		if(!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Không thể xóa vì chứa dữ liệu ràng buộc !"));
		}
		if(document.getUrl()!=null) {
			cloudinaryImageServiceIml.destroy(document.getUrl());
		}
		documentRepository.delete(document);
		
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Xóa thành công !"));
	}
	public Integer getAllCount() {
		return documentRepository.getAllCount();
	}
	public Integer getAllCountEnabled() {
		return documentRepository.getAllCountEnabled();
	}
	public ResponseEntity<?> sendDownloadEmail(Long userId,Integer documentId){
		
		try {
			User user = userRepository.findById(userId).orElse(null);
			Document doc =documentRepository.findById(documentId).orElse(null);
			if(user!=null&doc!=null) {
				eventListener.sendDownloadEmail(user, doc.getUrl());
				Transaction transaction = new Transaction();
				transaction.setUser(user);
				transaction.setDocument(doc);
				transaction.setAmount(doc.getPrice());
				transaction.setCreated_at(new Date());
				transaction.setCurrency_code("VND");
				transactionRepository.save(transaction);
				return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Link tải đã được gửi tới email"));
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Đã xảy ra lỗi"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Đã xảy ra lỗi"));
		}
		
		
	}
}
