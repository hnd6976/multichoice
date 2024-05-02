package com.app.abe.controllers.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.security.jwt.JwtUtils;
import com.app.abe.services.UserService;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin/dashboard/user")
public class UserDashboardController {
	//@Autowired
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserService userService;
	@GetMapping("/getListYear")
	public List<Integer> getListYear() {
		 return userService.getListYear();
	}
	@GetMapping("/getListMonth/{year}")
	public List<Integer> getListMonth(@PathVariable("year") int year) {
		 return userService.getListMonth(year);	
	}
	@GetMapping("/getListDay/{year}/{month}")
	public List<Integer> getListDay(@PathVariable("year") int year,@PathVariable("month") int month) {
		 return userService.getListDay(year,month);	
	}
	@GetMapping("/getCountAll")
	public Long getCountAll() {
		return userService.getCountAll();
	}
	@GetMapping("/getCountActive")
	public Long getCountActive() {
		return userService.getCountActive();
	}
	@GetMapping("/getCountCreatedEachYear")
	public List<Object> getCountCreatedEachYear() {
		return userService.getCountCreatedEachYear();
	}
	@GetMapping("/getCountCreatedEachMonth/{year}")
	public List<Object> getCountCreatedEachMonth(@PathVariable("year") Integer year) {
		return userService.getCountCreatedEachMonth(year);
	}
	@GetMapping("/getCountCreatedEachDay/{year}/{month}")
	public List<Object> getCountCreatedEachDay(@PathVariable("year") Integer year,
			@PathVariable("month") Integer month) {
		return userService.getCountCreatedEachDay(year,month);
	}
}
