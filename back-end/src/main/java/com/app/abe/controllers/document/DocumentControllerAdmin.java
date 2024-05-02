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
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.models.Transaction;
import com.app.abe.services.DocumentService;
import com.app.abe.services.TransactionService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/document")
public class DocumentControllerAdmin {
    @Autowired
    private DocumentService documentService;
    @Autowired
    private TransactionService transactionService;
    @GetMapping(value="/getAll/{gradeId}/{subjectId}/{page}/{size}",produces = { "application/json" })
	public PageData<Document> getAll(@PathVariable("gradeId") int gradeId,@PathVariable("subjectId") int subjectId,
			@RequestParam(value = "key", required = false) String key,@PathVariable("page") int pageNum, @PathVariable("size") int pageSize){
		return  documentService.getAll(gradeId,subjectId, key, pageNum, pageSize);
		}
    @PostMapping("/add")
    public ResponseEntity<ResponseObject> addDocument(@RequestParam("name") String name,
    		@RequestParam("subjectId") Integer subjectId,
    		@RequestParam("price") Float price,
    		@RequestParam("file") Optional<MultipartFile> file)throws Exception{
        return documentService.addDocument(name,subjectId,price,file);
    }
    @PostMapping("/edit/{id}")
    public ResponseEntity<ResponseObject> editDocument(@PathVariable("id") int id,@RequestParam("name") String name,
    		@RequestParam("subjectId") Integer subjectId,
    		@RequestParam("price") Float price,
    		@RequestParam("file") Optional<MultipartFile> file)throws Exception{
        return documentService.editDocument(id,name,subjectId,price,file);
    }
    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteDocument(@PathVariable("id") int id){
        return documentService.deleteDocument(id);
    }
    @PostMapping("/setState/{id}")
    public ResponseEntity<?> setState(@PathVariable("id") int id){
        return documentService.setState(id);
    }
    @GetMapping("/getTransactionByDocumentId/{id}/{page}/{size}")
	public PageData<Transaction> getTransactionByDocumentId(@PathVariable Integer id,@PathVariable("page") Integer pageNum, @PathVariable("size") Integer pageSize){
		return transactionService.getByDocumentId(id, pageNum, pageSize);
	}
}
