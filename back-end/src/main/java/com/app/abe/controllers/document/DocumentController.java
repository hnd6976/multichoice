package com.app.abe.controllers.document;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.abe.models.Document;
import com.app.abe.models.Exam;
import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.services.DocumentService;
import com.app.abe.services.DocumentViewCounterService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/document")
public class DocumentController{
    @Autowired
    private DocumentService documentService;
    @Autowired
	private DocumentViewCounterService documentViewCounterService;
    @GetMapping(value="/getAll/{gradeId}/{subjectId}/{page}/{size}",produces = { "application/json" })
	public PageData<Document> getAllEnabled(@PathVariable("gradeId") int gradeId,@PathVariable("subjectId") int subjectId,
			@RequestParam(value = "key", required = false) String key,@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		return  documentService.getAllEnabled(gradeId,subjectId, key, pageNum, pageSize);
		}
    @GetMapping("/increase/{id}")
	public void increase(@PathVariable("id") Integer documentId) {
		 documentViewCounterService.increaseView(documentId); 
		
	}
    @PostMapping("/download/{userId}/{documentId}")
	public void increase(@PathVariable("userId") Long userId,@PathVariable("documentId") Integer documentId) {
    	documentService.sendDownloadEmail(userId, documentId);
		
	}
}

