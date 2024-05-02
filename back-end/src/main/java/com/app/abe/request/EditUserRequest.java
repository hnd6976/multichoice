package com.app.abe.request;

import java.util.List;
import java.util.Set;

public class EditUserRequest {
	private Long userId;
	private boolean sta;
	private Set<String> roles;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public boolean isSta() {
		return sta;
	}
	public void setSta(boolean sta) {
		this.sta = sta;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	public EditUserRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
