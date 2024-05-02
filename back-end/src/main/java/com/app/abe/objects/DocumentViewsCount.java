package com.app.abe.objects;

import java.util.Date;

public class DocumentViewsCount {
	private  Date day;
	private Long count;
	public Date getDay() {
		return day;
	}
	public void setDay(Date day) {
		this.day = day;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	public DocumentViewsCount() {
		super();
		// TODO Auto-generated constructor stub
	}
	public DocumentViewsCount(Date day, Long count) {
		super();
		this.day = day;
		this.count = count;
	}
	
}
