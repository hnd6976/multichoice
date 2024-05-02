package com.app.abe.request;

public class ExamCompletedRequest {
	private Long userId;
	private Integer examId;
	private int correctAnswers;
	private int time;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getExamId() {
		return examId;
	}
	public void setExamId(Integer examId) {
		this.examId = examId;
	}
	public int getCorrectAnswers() {
		return correctAnswers;
	}
	public void setCorrectAnswers(int correctAnswers) {
		this.correctAnswers = correctAnswers;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public ExamCompletedRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
