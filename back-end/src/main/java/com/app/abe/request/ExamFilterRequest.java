package com.app.abe.request;

public class ExamFilterRequest {
	private Integer grade;
	private Integer subject;
	private String key;
	public Integer getGrade() {
		return grade;
	}
	public void setGrade(Integer grade) {
		this.grade = grade;
	}
	public Integer getSubject() {
		return subject;
	}
	public void setSubject(Integer subject) {
		this.subject = subject;
	}
	public String getKey() {
		return key;
	}
	public void setKey(String key) {
		this.key = key;
	}
	public ExamFilterRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
}
