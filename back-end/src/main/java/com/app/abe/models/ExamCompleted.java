package com.app.abe.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "ExamCompleteds")
public class ExamCompleted {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	//@JsonBackReference
	//@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="user_id")
	@EqualsAndHashCode.Exclude
    @ToString.Exclude
	private User user;
	//@JsonBackReference
	//@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="exam_id")
	@EqualsAndHashCode.Exclude
    @ToString.Exclude
	private Exam exam;
	private int correctAnswers;
	private int totalQuestion;
	private int time;
	private Date day;
	
	public int getTotalQuestion() {
		return totalQuestion;
	}
	public void setTotalQuestion(int totalQuestion) {
		this.totalQuestion = totalQuestion;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Exam getExam() {
		return exam;
	}
	public void setExam(Exam exam) {
		this.exam = exam;
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
	public Date getDay() {
		return day;
	}
	public void setDay(Date day) {
		this.day = day;
	}
	public ExamCompleted() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
