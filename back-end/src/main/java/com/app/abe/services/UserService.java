package com.app.abe.services;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.abe.event.RegistrationCompleteEvent;
import com.app.abe.event.listener.RegistrationCompleteEventListener;
import com.app.abe.models.Document;
import com.app.abe.models.ERole;
import com.app.abe.models.Exam;
import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.models.Role;
import com.app.abe.models.User;
import com.app.abe.models.VerificationToken;
import com.app.abe.repositories.RoleRepository;
import com.app.abe.repositories.UserRepository;
import com.app.abe.repositories.VerificationTokenRepository;
import com.app.abe.request.EditUserRequest;
import com.app.abe.request.SignupRequest;
import com.app.abe.response.MessageResponse;
import com.app.abe.security.password.PasswordRequestUtil;
import com.app.abe.security.password.PasswordResetToken;
import com.app.abe.security.password.PasswordResetTokenRepository;
import com.app.abe.security.password.PasswordResetTokenService;
import com.app.abe.security.services.UserDetailsImpl;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private VerificationTokenRepository tokenRepository;
	@Autowired
	private PasswordResetTokenRepository passwordResetTokenRepository;
	@Autowired
	private  ApplicationEventPublisher publisher;
	@Autowired
	private RegistrationCompleteEventListener eventListener;
	@Autowired
	private PasswordResetTokenService passwordResetTokenService;
	public PageData<User> getListUser(int pageNum,int pageSize,String key){
		String sortBy = "id";
		Pageable paging = PageRequest.of(pageNum, pageSize, Sort.by(sortBy));
		Page<User> pagedResult = userRepository.findAll(key,paging);
		if (pagedResult.hasContent()) {
	        PageData<User> pageData = new PageData(pagedResult.getSize(),
	                pagedResult.getTotalPages(),(int)pagedResult.getTotalElements(), pagedResult.getContent());
	            return pageData;
	        } else {
	            PageData<User> pageData = new PageData(0,0,0,new ArrayList<>());
	            return pageData; 
	        }
	}
	public UserDetailsImpl getProfile(Long id) {
		UserDetailsImpl user=UserDetailsImpl.build(userRepository.findById(id).orElseThrow());
		return user;
		
	}
	public ResponseEntity<ResponseObject> signup(SignupRequest signUpRequest,final HttpServletRequest request) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(new ResponseObject("Error","Tên đã tồn tại", ""));
		    }

		    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
		    	return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new ResponseObject("Error","Email đã tồn tại", ""));
		    }

		    // Create new user's account
		    User user = new User(signUpRequest.getUsername(), 
		               signUpRequest.getEmail(),
		               encoder.encode(signUpRequest.getPassword()));

		    Set<String> strRoles = signUpRequest.getRole();
		    Set<Role> roles = new HashSet<>();

		    if (strRoles == null) {
		      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		          .orElseThrow(() -> new RuntimeException("Error: Role user is not found."));
		      roles.add(userRole);
		    } else {
		      strRoles.forEach(role -> {
		        switch (role) {
		        case "admin":
		          Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
		              .orElseThrow(() -> new RuntimeException("Error: Role admin is not found."));
		          roles.add(adminRole);

		          break;
		        case "mod":
		          Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(modRole);

		          break;
		        default:
		          Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
		          roles.add(userRole);
		        }
		      });
		    }

		    user.setRoles(roles);
		    user.setCreated_at(new Date());
		   // String verificationToken = UUID.randomUUID().toString();
            
            //String url = applicationUrl(request)+"/api/auth/verifyEmail?token="+verificationToken;
		    //publisher.publishEvent(new RegistrationCompleteEvent(user, applicationUrl(request),"verifyEmail"));
            try {
				sendEmailLink(user,applicationUrl(request));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		    userRepository.save(user);
		    return ResponseEntity.status(HttpStatus.OK)
					.body(new ResponseObject("Success", "Signup successfully",user));
	}
	private void sendEmailLink(User user, String applicationUrl
            ) throws MessagingException, UnsupportedEncodingException {
		//VerificationToken token=tokenRepository.findByUserId(user.getId());
			publisher.publishEvent(new RegistrationCompleteEvent(user,applicationUrl));
	}
	public ResponseEntity<?> verifyEmail(String token, String email){
        VerificationToken theToken = tokenRepository.findByToken(token);
        System.out.print(theToken.getUser().getEmail().equals(email));
        if(theToken.getUser().getEmail().equals(email)) {
	        if (theToken.getUser().isEnabled()){
	        	return ResponseEntity.ok(new MessageResponse("already"));
	        }
	        String verificationResult =validateToken(token,email);
	        if (verificationResult.equalsIgnoreCase("valid")){
	        	return ResponseEntity.ok(new MessageResponse("success"));
	        }
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("invalid"));
    }
	public ResponseEntity<?> resendVerificationToken(String email,
            HttpServletRequest request){
		    User user=findByEmail(email).orElse(null);
		    if(user==null) {
		    	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Email"));
		    }
			VerificationToken verificationToken = generateNewVerificationToken(user.getId());
			
			User theUser = verificationToken.getUser();
			try {
				resendRegistrationVerificationTokenEmail(theUser, applicationUrl(request), verificationToken);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return ResponseEntity.ok(new MessageResponse("Mã xác nhận đã được gửi!"));
	} 
	public String resendPasswordResetToken(Long id,
            HttpServletRequest request){
		PasswordResetToken passwordResetToken = generateNewPasswordResetToken(id);
			User theUser = passwordResetToken.getUser();
			try {
				resendResetPasswordTokenEmail(theUser, applicationUrl(request), passwordResetToken);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return "A new passwordResetToken link has been sent to your email," +
			" please, check to activate your account";
	} 
	private void resendRegistrationVerificationTokenEmail(User theUser, String applicationUrl,
            VerificationToken verificationToken) throws MessagingException, UnsupportedEncodingException {
			String url = applicationUrl+"/api/auth/verifyEmail?token="+verificationToken.getToken();
			eventListener.sendVerificationEmail(theUser,url,verificationToken.getToken());
	}
	private void resendResetPasswordTokenEmail(User theUser, String applicationUrl,
			PasswordResetToken passwordResetToken) throws MessagingException, UnsupportedEncodingException {
			String url = applicationUrl+"/api/auth/verifyEmail?token="+passwordResetToken.getToken();
			eventListener.sendPasswordResetVerificationEmail(theUser,url,passwordResetToken.getToken());
	}
	public ResponseEntity<ResponseObject> resetPassword(PasswordRequestUtil passwordRequestUtil,HttpServletRequest request) {
		System.out.print(passwordRequestUtil.getEmail());
		User user = findByEmail(passwordRequestUtil.getEmail()).orElse(null);
        if (user!=null) {
        	try {
        		PasswordResetToken passwordResetToken=passwordResetTokenService.findByUserId(user.getId());
        		if(passwordResetToken==null)
				sendResetPasswordEmail(user,applicationUrl(request));
        		else
        			resendPasswordResetToken(user.getId(),request);
        			
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (MessagingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        	 return ResponseEntity.status(HttpStatus.OK)
 					.body(new ResponseObject("Success", "Mã xác nhận đã được gửi",user.getEmail()));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new ResponseObject("Error","Email khong dung", ""));
	}
	private void sendResetPasswordEmail(User theUser,String applicationUrl)throws MessagingException, UnsupportedEncodingException {
		Random rnd = new Random();
        int number = rnd.nextInt(999999);
    	String passwordResetToken=String.format("%06d", number);
        createPasswordResetTokenForUser(theUser, passwordResetToken);
        String url = applicationUrl+"/api/auth/reset-password?token="+passwordResetToken;
        eventListener.sendPasswordResetVerificationEmail(theUser,url,passwordResetToken);
	}
	public String applicationUrl(HttpServletRequest request) {
        return "http://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath();
    }
	public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	public void saveUserVerificationToken(User theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser);
        tokenRepository.save(verificationToken);
    }
	public String validateToken(String theToken,String email) {
        VerificationToken token = tokenRepository.findByToken(theToken);
        if(token == null||!token.getUser().getEmail().equals(email)){
        	 System.out.print("no");
            return "Invalid verification token";
        }
        User user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0){
            tokenRepository.delete(token);
            return "Token already expired";
        }
        user.setEnabled(true);
        userRepository.save(user);
        System.out.print("ok");
        return "valid";
    }
	public PasswordResetToken generateNewPasswordResetToken(Long id) {
		PasswordResetToken passwordResetToken = passwordResetTokenService.findByUserId(id);
        var verificationTokenTime = new PasswordResetToken();
        Random rnd = new Random();
        int number = rnd.nextInt(999999);
        passwordResetToken.setToken(String.format("%06d", number));
        passwordResetToken.setExpirationTime(verificationTokenTime.getTokenExpirationTime());
        return passwordResetTokenRepository.save(passwordResetToken);
    }
	public VerificationToken generateNewVerificationToken(Long id) {
        try {
			VerificationToken verificationToken = tokenRepository.findByUserId(id).orElse(null);
			if(verificationToken==null) {
				verificationToken=new VerificationToken();
			}
			var verificationTokenTime = new VerificationToken();
			Random rnd = new Random();
			int number = rnd.nextInt(999999);
			verificationToken.setToken(String.format("%06d", number));
			verificationToken.setExpirationTime(verificationTokenTime.getTokenExpirationTime());
			return tokenRepository.save(verificationToken);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return null;
		}
    }
    public void changePassword(User theUser, String newPassword) {
        theUser.setPassword(encoder.encode(newPassword));
        userRepository.save(theUser);
    }
    public String validatePasswordResetToken(String token,String email) {
    	System.out.print(email);
    	return passwordResetTokenService.validatePasswordResetToken(token,email);
    		
    }
    public User findUserByPasswordToken(String token) {
        return passwordResetTokenService.findUserByPasswordToken(token).get();
    }
    public void createPasswordResetTokenForUser(User user, String passwordResetToken) {
        passwordResetTokenService.createPasswordResetTokenForUser(user, passwordResetToken);
    }
    public boolean oldPasswordIsValid(User user, String oldPassword){
        return encoder.matches(oldPassword, user.getPassword());
    }
    public ResponseEntity<ResponseObject> editUser(Long id,Set<String> requestRoles ){
    	User user =userRepository.findById(id).orElse(null);
    	if(user==null) {
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    				.body(new ResponseObject("Error","Đã xảy ra lỗi", ""));
    	}
    	try {

			Set<String> strRoles = requestRoles;
			Set<Role> roles = new HashSet<>();
			if (strRoles == null) {
			  Role userRole = roleRepository.findByName(ERole.ROLE_USER)
			      .orElseThrow(() -> new RuntimeException("Error: Role user is not found."));
			  roles.add(userRole);
			} else {
			  strRoles.forEach(role -> {
			    switch (role) {
			    case "admin":
			      Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
			          .orElseThrow(() -> new RuntimeException("Error: Role admin is not found."));
			      roles.add(adminRole);

			      break;
			    case "mod":
			      Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
			          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			      roles.add(modRole);

			      break;
			    default:
			      Role userRole = roleRepository.findByName(ERole.ROLE_USER)
			          .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			      roles.add(userRole);
			    }
			  });
			}

			user.setRoles(roles);
			user.setUpdated_at(new Date());
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.OK)
 					.body(new ResponseObject("Success", "Cập nhật thành công",user));
		} catch (RuntimeException e) {
			// TODO Auto-generated catch block
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
    				.body(new ResponseObject("Error","Đã xảy ra lỗi", ""));
		}
    	
    }
    public ResponseEntity<?> setState(Long id){
		User user = userRepository.findById(id).orElse(null);
		if(user==null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Đã xảy ra lỗi"));
		}
		user.setSta(!user.getSta());;
		userRepository.save(user);
		if(user.getSta()) {
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã mở khóa tài khoản "+user.getUsername()));
		}
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Đã khóa tài khoản "+user.getUsername()));
	}
    public List<Integer> getListYear(){
		return userRepository.getListYear();
	}
	public List<Integer> getListMonth(Integer year){
		return userRepository.getListMonth(year);
	}
	public List<Integer> getListDay(Integer year,Integer month){
		return userRepository.getListDay(year, month);
	}
    public Long getCountAll() {
    	return userRepository.getCountAll();
    }
    public Long getCountActive() {
    	return userRepository.getCountActive();
    }
    public List<Object> getCountCreatedEachYear() {
    	/*List<User> list= userRepository.findAll();
    	list.forEach(e->{
    		Random rnd = new Random();
            int number = rnd.nextInt(0,730);
            Date currentDate = new Date(System.currentTimeMillis() - TimeUnit.DAYS.toMillis(number));
            e.setCreated_at(currentDate);
            userRepository.save(e);
    	});
        */
    	return userRepository.getCountCreatedEachYear();
    }
    public List<Object> getCountCreatedEachMonth(Integer year) {
    	return userRepository.getCountCreatedEachMonth(year);
    }
    public List<Object> getCountCreatedEachDay(Integer year,Integer month) {
    	return userRepository.getCountCreatedEachDay(year,month);
    }
    
}
