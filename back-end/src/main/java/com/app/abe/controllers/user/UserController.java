package com.app.abe.controllers.user;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.ExamCompleted;
import com.app.abe.models.PageData;
import com.app.abe.models.Transaction;
import com.app.abe.models.User;
import com.app.abe.request.ExamCompletedRequest;
import com.app.abe.security.jwt.AuthTokenFilter;
import com.app.abe.security.jwt.JwtUtils;
import com.app.abe.security.services.UserDetailsImpl;
import com.app.abe.services.ExamCompletedService;
import com.app.abe.services.TransactionService;
import com.app.abe.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
	//@Autowired
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserService userService;
	@Autowired
    private TransactionService transactionService;
	@Autowired
    private ExamCompletedService examCompletedService;
	@GetMapping("/getProfile")
	public UserDetailsImpl test(HttpServletRequest request) {
		System.out.print(request.getHeader("Authorization"));
		String headerAuth = request.getHeader("Authorization");
		String token;
	    if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
	       token=headerAuth.substring(7);
	       return userService.getProfile(jwtUtils.getUserIdFromJwtToken(token));
	    }

		return null;
	}
	@GetMapping("/getTransactionByUserId/{id}/{page}/{size}")
	public PageData<Transaction> getTransactionByUserId(@PathVariable Long id,@PathVariable("page") Integer pageNum, @PathVariable("size") Integer pageSize){
		return transactionService.getByUserId(id, pageNum, pageSize);
	}
	
	@GetMapping("/getExamCompletedByUserId/{id}/{page}/{size}")
	public PageData<ExamCompleted> getExamCompletedByUserId(@PathVariable Long id,@PathVariable("page") Integer pageNum, @PathVariable("size") Integer pageSize){
		return examCompletedService.getByUserId(id, pageNum, pageSize);
	}
	@GetMapping("/init")
	public void init() {
		 examCompletedService.init();
		
	}
	@PostMapping("/addExamCompleted")
	public ExamCompleted add(@Valid @RequestBody ExamCompletedRequest examCompletedRequest) {
		return examCompletedService.addExamCompleted(examCompletedRequest); 
		
	}
	
}
