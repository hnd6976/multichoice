package com.app.abe.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "subjects")
public class Subject {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String name;
	//@JsonBackReference
	//@JsonIgnore
	@ManyToOne 
	@JoinColumn(name="grade_id")
	private Grade grade;
	@JsonIgnore
	@OneToMany(mappedBy="subject",cascade=CascadeType.ALL)
	List<QuestionCategory> questionCategories;
	@JsonManagedReference
	@JsonIgnore
	@OneToMany(mappedBy="subject",cascade=CascadeType.ALL)
	private List<Exam> exams;
	@JsonIgnore
	@OneToMany(mappedBy="subject",cascade=CascadeType.ALL)
	List<Document> documents;
	private String image;
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Grade getGrade() {
		return grade;
	}
	public void setGrade(Grade grade) {
		this.grade = grade;
	}
	public List<QuestionCategory> getQuestionCategories() {
		return questionCategories;
	}
	public void setQuestionCategories(List<QuestionCategory> questionCategories) {
		this.questionCategories = questionCategories;
	}
	public List<Exam> getExams() {
		return exams;
	}
	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}
}
