package com.app.abe.request;

import java.util.List;

public class ExamRequest {
	private String title;
	private List<Integer> questions;
	private Integer time;
	private Integer subjectId;
	public ExamRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ExamRequest(String title, List<Integer> questions, Integer time, Integer subjectId) {
		super();
		this.title = title;
		this.questions = questions;
		this.time = time;
		this.subjectId = subjectId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<Integer> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Integer> questions) {
		this.questions = questions;
	}
	public Integer getTime() {
		return time;
	}
	public void setTime(Integer time) {
		this.time = time;
	}
	public Integer getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	
}
