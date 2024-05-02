package com.app.abe.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentRequest {

    private Long userId;
    private Integer ExamId;
    private String content;
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Integer getExamId() {
		return ExamId;
	}
	public void setExamId(Integer examId) {
		ExamId = examId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
    

}
