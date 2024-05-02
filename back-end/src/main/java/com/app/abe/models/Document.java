package com.app.abe.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "documents",uniqueConstraints = { 
		@UniqueConstraint(columnNames = "name")
	})
public class Document {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String name;
	private String url;
	private Float price;
	@ManyToOne 
	@JoinColumn(name="subject_id")
	private Subject subject;
	@OneToMany(mappedBy="document",cascade=CascadeType.ALL)
	private List<DocumentViewCounter> documentViewCounter;
	private Date created_at;
	private Date updated_at;
	private boolean enabled;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Subject getSubject() {
		return subject;
	}
	public void setSubject(Subject subject) {
		this.subject = subject;
	}
	
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
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
	public boolean isEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	public List<DocumentViewCounter> getDocumentViewCounter() {
		return documentViewCounter;
	}
	public void setDocumentViewCounter(List<DocumentViewCounter> documentViewCounter) {
		this.documentViewCounter = documentViewCounter;
	}
	public Document() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}
