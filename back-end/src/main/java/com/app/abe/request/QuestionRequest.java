package com.app.abe.request;

import java.util.List;

import com.app.abe.models.Answer;

public class QuestionRequest {
	private String json;
	private String html;
	private List<Answer> answers;
	private byte trueIndex;
	private Integer questionCateId;
	public String getJson() {
		return json;
	}
	public void setJson(String json) {
		this.json = json;
	}
	public String getHtml() {
		return html;
	}
	public void setHtml(String html) {
		this.html = html;
	}
	public List<Answer> getAnswers() {
		return answers;
	}
	public void setAnswers(List<Answer> answers) {
		this.answers = answers;
	}
	public byte getTrueIndex() {
		return trueIndex;
	}
	public void setTrueIndex(byte trueIndex) {
		this.trueIndex = trueIndex;
	}
	public Integer getQuestionCateId() {
		return questionCateId;
	}
	public void setQuestionCateId(Integer questionCateId) {
		this.questionCateId = questionCateId;
	}
	
	
	
}
