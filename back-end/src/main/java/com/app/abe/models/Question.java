package com.app.abe.models;

import java.util.Date;
import java.util.List;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreRemove;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@Table(name = "questions")
public class Question {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String json;
	@NotBlank
	private String html;
	//@JsonBackReference
	@OneToMany(mappedBy="question",cascade=CascadeType.ALL)
	private List<Answer> answers;
	@JsonBackReference
	@ManyToMany(mappedBy = "questions")
	List<Exam> exams;
	//@JsonBackReference
	@ManyToOne
	@JoinColumn(name="questionCategory_id")
	private QuestionCategory questionCategory;
	private int trueIndex;
	private String image;
	private Date created_at;
	private Date updated_at;
	public Question() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public Integer getId() {
		return id;
	}



	public void setId(Integer id) {
		this.id = id;
	}



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



	public List<Exam> getExams() {
		return exams;
	}



	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}



	public QuestionCategory getQuestionCategory() {
		return questionCategory;
	}



	public void setQuestionCategory(QuestionCategory questionCategory) {
		this.questionCategory = questionCategory;
	}



	public int getTrueIndex() {
		return trueIndex;
	}



	public void setTrueIndex(int trueIndex) {
		this.trueIndex = trueIndex;
	}



	public String getImage() {
		return image;
	}



	public void setImage(String image) {
		this.image = image;
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



	@PreRemove
	private void removeAssociations() {
	   for (Exam exam: this.exams) {
	       exam.getQuestions().remove(this);
	   }
	  
	}
	
}
