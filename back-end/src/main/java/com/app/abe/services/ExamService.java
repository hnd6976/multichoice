package com.app.abe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import com.app.abe.models.Comment;
import com.app.abe.models.Document;
import com.app.abe.models.Exam;
import com.app.abe.models.ExamCompleted;
import com.app.abe.models.Notification;
import com.app.abe.models.PageData;
import com.app.abe.models.Question;
import com.app.abe.models.ResponseObject;
import com.app.abe.models.User;
import com.app.abe.repositories.CommentRepository;
import com.app.abe.repositories.ExamCompletedRepository;
import com.app.abe.repositories.ExamRepository;
import com.app.abe.repositories.NotificationRepository;
import com.app.abe.repositories.QuestionRepository;
import com.app.abe.repositories.SubjectRepository;
import com.app.abe.repositories.UserRepository;
import com.app.abe.request.CommentRequest;
import com.app.abe.request.ExamRequest;
import com.app.abe.request.MultiExamRequest;
import com.app.abe.response.MessageResponse;

@Service
public class ExamService {
	@Autowired 
	private ExamRepository examRepository;
	@Autowired 
	private UserRepository userRepository;
	@Autowired 
	private SubjectRepository subRepository;
	@Autowired 
	private QuestionRepository quesRepository;
	@Autowired
	private ExamCompletedService examCompletedService;
	@Autowired
	private ExamCompletedRepository examCompletedRepository;
	@Autowired
	private NotificationService notificationService;
	@Autowired
	private CommentRepository commentRepository ;
	public Optional<Exam> getById(Integer id) {
		return examRepository.findById(id);
	}
	public Optional<Exam> getByTitle(String title) {
		return examRepository.findByTitle(title);
	}
	
	public PageData<Exam> getAll(Integer gradeId,Integer subjectId,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Exam> pagedResult=subjectId!=0?examRepository.findBySubjectId(subjectId, key, paging):
			gradeId!=0?examRepository.findByGradeId(gradeId, key, paging):examRepository.findByKey(key, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Exam> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Exam> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	
	}
	
	public PageData<Exam> getAllEnabled(Integer gradeId,Integer subjectId,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Exam> pagedResult=subjectId!=0?examRepository.findBySubjectIdEnabled(subjectId, key, paging):
			gradeId!=0?examRepository.findByGradeIdEnabled(gradeId, key, paging):examRepository.findByKeyEnabled(key, paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Exam> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Exam> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	
	}
	public PageData<Exam> getBySubjectId(Integer id,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Exam> pagedResult=examRepository.findBySubjectId(id,key,paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Exam> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Exam> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	public PageData<Exam> getByGradeId(Integer id,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Exam> pagedResult=examRepository.findByGradeId(id,key,paging);
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Exam> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Exam> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	public ResponseEntity<ResponseObject> addExam(ExamRequest examRequest ) {
		Optional<Exam> examByTitle=examRepository.findByTitle(examRequest.getTitle());
		System.out.print(examByTitle);
		if(!(examByTitle.isEmpty())){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Tiêu đề đã được đặt", ""));
		}	
		try {
			Exam exam = new Exam();
			exam.setTitle(examRequest.getTitle());
			System.out.print(examRequest.getTime());
			exam.setTime(examRequest.getTime());
			exam.setSubject(subRepository.findById(examRequest.getSubjectId()).orElseThrow());
			List<Question> list = new ArrayList<>();
			examRequest.getQuestions().forEach(e->{
				Question question = quesRepository.findById(e).orElseThrow();
				list.add(question);
			});
			exam.setQuestions(list);
			exam.setCreated_at(new Date());
			examRepository.save(exam);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Tạo đề trắc nghiệm thành công",exam));
		} catch (Exception e) {
			System.out.print(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Lỗi", ""));
		}
	}
	
public ResponseEntity<ResponseObject> editExam(Integer id,ExamRequest examRequest ) {
		
		try {
			Exam exam = examRepository.findById(id).orElseThrow();
			if(exam!=null) {
			exam.setTitle(examRequest.getTitle());
			System.out.print(examRequest.getTime().toString());
			exam.setTime(examRequest.getTime());
			exam.setSubject(subRepository.findById(examRequest.getSubjectId()).orElseThrow());
			List<Question> list = new ArrayList<>();
			examRequest.getQuestions().forEach(e->{
				Question question = quesRepository.findById(e).orElseThrow();
				list.add(question);
			});
			exam.setQuestions(list);
			exam.setUpdated_at(new Date());
			examRepository.save(exam);
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Edit successfully",exam));
			}
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Lỗi", ""));
		} catch (Exception e) {
			System.out.print(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Lỗi", ""));
		}
	}
public ResponseEntity<?> deleteExam(Integer id){
	Exam exam = examRepository.findById(id).orElse(null);
	if(exam==null) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Không tìm thấy đề trắc nghiệm !"));
	}
	List<ExamCompleted> list= examCompletedRepository.findByExamId(id);
	if(!list.isEmpty()) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Không thể xóa vì chứa dữ liệu ràng buộc !"));
	}
	examRepository.delete(exam);
	return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Xóa thành công !"));
}
public ResponseEntity<?> setState(Integer id){
	Exam exam = examRepository.findById(id).orElse(null);
	if(exam==null) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Đã xảy ra lỗi !"));
	}
	exam.setEnabled(!exam.isEnabled());
	examRepository.save(exam);
	if(exam.isEnabled()) {
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã mở khóa đề "+exam.getTitle()));
	}
	return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã khóa đề "+exam.getTitle()));
}
	public Integer getAllCount() {
		return examRepository.getAllCount();
	}
	public Integer getAllCountEnabled() {
		return examRepository.getAllCountEnabled();
	}
	public Comment addComment(CommentRequest commentRequest) {
        
        User user=userRepository.findById(commentRequest.getUserId()).orElse(null);
        Exam exam =examRepository.findById(commentRequest.getExamId()).orElse(null);
        Comment comment=new Comment();
        comment.setUser(user);
        comment.setExam(exam);
        comment.setContent(commentRequest.getContent());
        Notification notification = new Notification();
        notification.setDelivered(false);
        notification.setContent("Góp ý mới từ "+user.getUsername());
        notification.setUser(user);
        notificationService.createNotification(notification);
        return commentRepository.save(comment);
    }
	public String addMultiExam(MultiExamRequest request) {
		 List<Exam> listExam= new ArrayList<>();
		 String header =getAlphaNumericString(2);
		for(int i=0;i<request.getNumExam();i++) {
			Exam exam = new Exam();
			exam.setEnabled(true);
			exam.setSubject(subRepository.findById(request.getSubjectId()).orElseThrow());
			Random rnd = new Random();
	        int number = rnd.nextInt(100,999);
	        exam.setTitle(request.getTitle()+" "+header+number);
	        exam.setTime(request.getTime());
	        List<Question> listQuestion= new ArrayList<>();
	        request.getListQues().forEach(e->{
	        	List<Question> list = quesRepository.findByQuestionCategoryId(e.getId());
	        	System.out.print(e.getNum());
	        	for(int j=0;j<e.getNum();j++) {
	        		if(list.size()>1) {
		        	Random rn = new Random();
			        int num = rn.nextInt(0,list.size()-1);
			        listQuestion.add(list.get(num));
			        list.remove(num);
	        		}else {
	        			listQuestion.add(list.get(0));
	        		}
	        	}

	        }
	        );
	       exam.setQuestions(listQuestion);
	       exam.setCreated_at(new Date());
	       listExam.add(examRepository.save(exam));
		}
		return request.getTitle()+" "+header+"XXX";
	}
	static String getAlphaNumericString(int n) 
	 { 
	 
	  // choose a Character random from this String 
	  String AlphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	          
	 
	  // create StringBuffer size of AlphaNumericString 
	  StringBuilder sb = new StringBuilder(n); 
	 
	  for (int i = 0; i < n; i++) { 
	 
	   // generate a random number between 
	   // 0 to AlphaNumericString variable length 
	   int index 
	    = (int)(AlphaNumericString.length() 
	      * Math.random()); 
	 
	   // add Character one by one in end of sb 
	   sb.append(AlphaNumericString 
	      .charAt(index)); 
	  } 
	 
	  return sb.toString(); 
	 }
}
