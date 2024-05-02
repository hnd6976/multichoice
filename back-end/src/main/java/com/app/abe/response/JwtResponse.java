package com.app.abe.response;

import java.util.List;

import com.app.abe.security.services.UserDetailsImpl;

public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private UserDetailsImpl user;
  private List<String> roles;
public String getToken() {
	return token;
}
public void setToken(String token) {
	this.token = token;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public UserDetailsImpl getUser() {
	return user;
}
public void setUser(UserDetailsImpl user) {
	this.user = user;
}
public List<String> getRoles() {
	return roles;
}
public void setRoles(List<String> roles) {
	this.roles = roles;
}
public JwtResponse(String token, UserDetailsImpl user, List<String> roles) {
	super();
	this.token = token;
	this.user = user;
	this.roles = roles;
}
  
}

