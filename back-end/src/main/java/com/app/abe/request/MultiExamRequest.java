package com.app.abe.request;

import java.util.List;

public class MultiExamRequest {
	private Integer subjectId;
	private List<QuesCateNumRequest> listQues;
	private String title;
	private int time;
	private int num;
	private int numExam;
	public Integer getSubjectId() {
		return subjectId;
	}
	public void setSubjectId(Integer subjectId) {
		this.subjectId = subjectId;
	}
	public List<QuesCateNumRequest> getListQues() {
		return listQues;
	}
	public void setListQues(List<QuesCateNumRequest> listQues) {
		this.listQues = listQues;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getNumExam() {
		return numExam;
	}
	public void setNumExam(int numExam) {
		this.numExam = numExam;
	}
	
}
