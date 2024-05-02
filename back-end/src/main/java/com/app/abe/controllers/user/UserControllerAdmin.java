package com.app.abe.controllers.user;

import java.util.Base64;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.PageData;
import com.app.abe.models.ResponseObject;
import com.app.abe.models.User;
import com.app.abe.request.EditUserRequest;
import com.app.abe.security.jwt.AuthTokenFilter;
import com.app.abe.security.jwt.JwtUtils;
import com.app.abe.security.services.UserDetailsImpl;
import com.app.abe.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/user")
public class UserControllerAdmin {
	//@Autowired
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserService userService;
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
	@GetMapping("/getListUser/{page}/{size}")
	public PageData<User> getListUser(@PathVariable("page") int page,@PathVariable("size") int size,
			@RequestParam(value = "key", required = false) String key){
		return userService.getListUser(page, size,key);
	}
	@PostMapping("/editUser/{id}")
	public ResponseEntity<ResponseObject> editUser(@Valid @RequestBody Set<String> roles,
			@PathVariable("id") Long id){
		return userService.editUser(id,roles);
		
	}
	@PostMapping("/setState/{id}")
    public ResponseEntity<?> setState(@PathVariable("id") Long id){
        return userService.setState(id);
    }
	
}
