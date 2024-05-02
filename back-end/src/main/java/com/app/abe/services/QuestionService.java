package com.app.abe.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.abe.models.Answer;
import com.app.abe.models.PageData;
import com.app.abe.models.Question;
import com.app.abe.models.QuestionCategory;
import com.app.abe.models.ResponseObject;
import com.app.abe.repositories.AnswerRepository;
import com.app.abe.repositories.QuestionCategoryRepository;
import com.app.abe.repositories.QuestionRepository;

@Service
public class QuestionService {
	@Autowired
	private QuestionRepository questionRepository;
	@Autowired
	private AnswerRepository answerRepository;
	@Autowired
	private QuestionCategoryRepository questionCategoryRepository;
	@Autowired
	private CloudinayImageServiceIml 	cloudinaryImageServiceIml;
	public Optional<Question> getById(Integer id) {
		return questionRepository.findById(id);
	}
	public PageData<Question> getAll(int id,int subId,String key,int pageNum,int pageSize){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<Question> pagedResult=id!=0?questionRepository.findByQuestionCategoryIdAndKey(id,key,paging):subId!=0?
			questionRepository.findBySubjectIdAndKey(subId, key, paging):questionRepository.findByKey(key,paging);
		//if(key!="") {
		//pagedResult=pagedResult.filter(e->e.getContent().contains(key)).;
		//}
		if (pagedResult.hasContent()) {
	        //convert Page to simpler format in PageData
	        PageData<Question> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	           // long totalPages = pagedResult.getTotalPages();
	            return pageData; //pagedResult.getContent();
	        } else {
	            PageData<Question> pageData = new PageData(0,0,0,new ArrayList<>()); 
	            return pageData; 
	        }
	}
	//public List<Question> getQuestionByCategoryId(Integer id){
	//	return questionRepository.findByQuestionCategoryId(id);
	//}
	public ResponseEntity<ResponseObject> addQuestion(String json,String html,List<Answer> answers,int trueIndex,
			Integer questionCateId,Optional<MultipartFile> imageFile)throws Exception{
		try {
			Question question = new Question();
			System.out.print(questionCateId);
			question.setJson(json);
			question.setHtml(html);
			List<Answer> list=new ArrayList<>();
			answers.forEach(e->{
				Answer answer=new Answer();
				answer.setJson(e.getJson());
				answer.setHtml(e.getHtml());
				//answer.setQuestion(question);
				answerRepository.save(answer);
				list.add(answer);
			});
			list.forEach(e->{
				e.setQuestion(question);
			});
			question.setAnswers(list);
			question.setTrueIndex(trueIndex);
			QuestionCategory questionCategory=questionCategoryRepository.findById(questionCateId).orElseThrow();
			question.setQuestionCategory(questionCategory);
			questionRepository.save(question);
			MultipartFile file = imageFile.orElse(null);
			if(!(file==null)) {
		        Map data=cloudinaryImageServiceIml.upload(file);
				question.setImage(data.get("public_id").toString());
				questionRepository.save(question);
		    }
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Update successfully",question));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Lỗi", ""));
		}
	}
	public ResponseEntity<ResponseObject> editQuestion(Integer id,String json,String html,List<Answer> answers,byte trueIndex,
			Integer questionCateId, Optional<MultipartFile> imageFile)throws Exception {
		Question question =questionRepository.findById(id).orElseThrow();
		if (question!=null) {
			question.setJson(json);
			question.setHtml(html);
			List<Answer> list=new ArrayList<>();
			answers.forEach(e->{
				Answer answer = answerRepository.findById(e.getId()).orElseThrow();
				answer.setJson(e.getJson());
				answer.setHtml(e.getHtml());
				answerRepository.save(answer);
				list.add(answer);
			});
			question.setAnswers(list);
			question.setTrueIndex(trueIndex);
			QuestionCategory questionCategory = questionCategoryRepository.findById(questionCateId).orElseThrow();
			question.setQuestionCategory(questionCategory);
			MultipartFile file = imageFile.orElse(null);
			if (!(file==null)) {
				if(question.getImage()!=null) {
					cloudinaryImageServiceIml.destroy(question.getImage());
				}
				Map data=cloudinaryImageServiceIml.upload(file);
				question.setImage(data.get("public_id").toString());
			}
			questionRepository.save(question);
			 return ResponseEntity.status(HttpStatus.OK)
						.body(new ResponseObject("Success", "Update successfully",question));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error","Lỗi", ""));
	}
	public ResponseEntity<ResponseObject> deleteQuestion(Integer id) {
		Question question =questionRepository.findById(id).orElseThrow();
		if(question!=null) {
			
			if(question.getImage()!=null) {
			  Map data=cloudinaryImageServiceIml.destroy(question.getImage());
			  }
			questionRepository.deleteById(id);
			  return ResponseEntity.status(HttpStatus.OK)
						.body(new ResponseObject("Success", "Delete successfully",""));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error","Lỗi", ""));
	}
}
