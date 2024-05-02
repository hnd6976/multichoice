package com.app.abe.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.app.abe.request.ExamRequest;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;


@Entity
@Table(name = "exams",uniqueConstraints = { 
		@UniqueConstraint(columnNames = "title")
	})
public class Exam {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String title;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "exam_questions", 
				joinColumns = @JoinColumn(name = "exam_id"), 
				inverseJoinColumns = @JoinColumn(name = "question_id"))
	private List<Question> questions = new ArrayList<>();
	//@JsonBackReference
	@ManyToOne 
	@JoinColumn(name="subject_id")
	private Subject subject;
	private Integer time;
	private boolean enabled;
	private Date created_at;
	private Date updated_at;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public List<Question> getQuestions() {
		return questions;
	}
	public void setQuestions(List<Question> questions) {
		this.questions = questions;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	public Integer getTime() {
		return time;
	}
	public void setTime(Integer time) {
		this.time = time;
	}
	
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public Date getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}
	public Date getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}
	public Exam() {
		super();
		// TODO Auto-generated constructor stub
	}
	@PreRemove
	private void removeAssociations() {
	   for (Question question: this.questions) {
	       question.getExams().remove(this);
	   }
	}
	public void removeQuestion(Question question){
		   this.questions.remove(question);
		   question.getExams().remove(this);
		}
	
}
