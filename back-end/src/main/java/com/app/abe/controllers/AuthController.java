package com.app.abe.controllers;


import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;
import javax.net.ssl.SSLEngineResult.Status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.app.abe.models.ResponseObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.app.abe.config.MailBuilder;
import com.app.abe.event.listener.RegistrationCompleteEventListener;
import com.app.abe.models.Answer;
import com.app.abe.models.ERole;
import com.app.abe.models.Exam;
import com.app.abe.models.Grade;
import com.app.abe.models.Mail;
import com.app.abe.models.Question;
import com.app.abe.models.Role;
import com.app.abe.models.Subject;
import com.app.abe.models.User;
import com.app.abe.models.VerificationToken;
import com.app.abe.security.services.UserDetailsImpl;
import com.app.abe.request.LoginRequest;
import com.app.abe.request.SignupRequest;
import com.app.abe.response.JwtResponse;
import com.app.abe.response.MessageResponse;
import com.app.abe.repositories.AnswerRepository;
import com.app.abe.repositories.ExamRepository;
import com.app.abe.repositories.GradeRepository;
import com.app.abe.repositories.QuestionRepository;
import com.app.abe.repositories.RoleRepository;
import com.app.abe.repositories.SubjectRepository;
import com.app.abe.repositories.UserRepository;
import com.app.abe.repositories.VerificationTokenRepository;
import com.app.abe.security.jwt.JwtUtils;
import com.app.abe.security.password.PasswordRequestUtil;
import com.app.abe.services.EmailService;
import com.app.abe.services.UserService;
import com.app.abe.models.ResponseObject;
import com.fasterxml.jackson.databind.*;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

//@CrossOrigin(origins = "*",allowedHeaders = "*", allowCredentials = "true", maxAge = 3600)
@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;
	@Autowired
	private EmailService emailService;
	@Autowired
	private UserService userService;
	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;
	@Autowired
	AnswerRepository ansRepository;
	@Autowired
	QuestionRepository quesRepository;
	@Autowired
	ExamRepository exRepository;
	@Autowired
	GradeRepository graRepository;
	@Autowired
	SubjectRepository subRepository;
	@Autowired
	private VerificationTokenRepository tokenRepository;
	@Autowired
	private  RegistrationCompleteEventListener publisher;
	@GetMapping("/test")
	public List<Grade> test() {
		return graRepository.findAll();
		/*List<Question> qe=quesRepository.findAll();
		Exam ex=exRepository.findById((long)1).orElseThrow();
		ex.setQuestions(qe);
		exRepository.save(ex);*/
	}
	@PostMapping("/signin")
	  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

	    try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = jwtUtils.generateJwtToken(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
			System.out.print(userDetails.getImage());
			if(!userDetails.isSta()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Tài khoản bị khóa !"));
			}
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());
			//if(userDetails.)
			return ResponseEntity.ok(new JwtResponse(jwt, userDetails, roles));
		} catch (Exception e){
			System.out.print(e.getClass()==UsernameNotFoundException.class);
			// TODO: handle exception
			if(e.getMessage()=="User is disabled")
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("disabled"));
			if(e.getClass()==UsernameNotFoundException.class)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Email không đúng"));
			else
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Sai mật khẩu"));
		}
	  }

	@PostMapping("/signup")
	  public ResponseEntity<ResponseObject> registerUser(@Valid @RequestBody SignupRequest signUpRequest,final HttpServletRequest request) {
		 ResponseEntity<ResponseObject> response = userService.signup(signUpRequest,request);
		// System.out.print(response.getBody().getData().);
		 return response;
	  }
	@PostMapping("/verifyEmail")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token,@RequestParam("email") String email){
        return userService.verifyEmail(token, email);
    }



    public String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }
    @GetMapping("/resend-verification-token")
    public ResponseEntity<?> resendVerificationToken(@RequestParam("email") String email,
                                         final HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return userService.resendVerificationToken(email, request);
    }
    
    @PostMapping("/password-reset-request")
    public ResponseEntity<ResponseObject> resetPasswordRequest(@RequestBody PasswordRequestUtil passwordRequestUtil,
                               final HttpServletRequest servletRequest)
           throws MessagingException, UnsupportedEncodingException {
    	
        return userService.resetPassword(passwordRequestUtil, servletRequest);
    }
 
    @PostMapping("/reset-password-check")
    public ResponseEntity<ResponseObject> resetPasswordCheck(@RequestParam("token") String token,
    		@RequestParam("email") String email)
           throws MessagingException, UnsupportedEncodingException {
    	if(userService.validatePasswordResetToken(token,email).equalsIgnoreCase("valid")) {
    		return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "valid",token));
        }
    	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error", "invalid",token));
    }
    
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody PasswordRequestUtil passwordRequestUtil,
                                @RequestParam("token") String token){
        String tokenVerificationResult = userService.validatePasswordResetToken(token,passwordRequestUtil.getEmail());
        if (!tokenVerificationResult.equalsIgnoreCase("valid")) {
            return "Invalid token password reset token";
        }
        Optional<User> theUser = Optional.ofNullable(userService.findUserByPasswordToken(token));
        if (theUser.isPresent()) {
            userService.changePassword(theUser.get(), passwordRequestUtil.getNewPassword());
            return "Password has been reset successfully";
        }
        return "Invalid password reset token";
    }
    @PostMapping("/change-password")
  public ResponseEntity<?> changePassword(@RequestBody PasswordRequestUtil requestUtil){
        User user = userService.findByEmail(requestUtil.getEmail()).orElse(null);
        if(user==null)
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Email"));
        if (!userService.oldPasswordIsValid(user, requestUtil.getOldPassword())){
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Sai mật khẩu !"
        			+ "\n Mật khẩu hiện tại không đúng !"));
        }
        userService.changePassword(user, requestUtil.getNewPassword());
        return ResponseEntity.ok(new MessageResponse("Success"));
  }
	@PostMapping("/test")
	public ResponseEntity<?> test(@RequestParam("imageFile") MultipartFile imageFile) {
		Path path = Paths.get("D:\\extra\\-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express-main\\frontend\\src\\assest");
		MultipartFile file = imageFile;
		if(!file.isEmpty()) {
	        try {
	        	InputStream input = file.getInputStream();
	        	Files.copy(input, path.resolve("AAAAAAA"+".jpeg"), StandardCopyOption.REPLACE_EXISTING);
	        	
	        	
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
	        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	       }
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
