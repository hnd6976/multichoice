package com.app.abe.objects;

public class Style {
	private String  textDecoration;
	private String	fontStyle;
	private String	fontWeight;
	private String	color;
	public String getTextDecoration() {
		return textDecoration;
	}
	public void setTextDecoration(String textDecoration) {
		this.textDecoration = textDecoration;
	}
	public String getFontStyle() {
		return fontStyle;
	}
	public void setFontStyle(String fontStyle) {
		this.fontStyle = fontStyle;
	}
	public String getFontWeight() {
		return fontWeight;
	}
	public void setFontWeight(String fontWeight) {
		this.fontWeight = fontWeight;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public Style(String textDecoration, String fontStyle, String fontWeight, String color) {
		super();
		this.textDecoration = textDecoration;
		this.fontStyle = fontStyle;
		this.fontWeight = fontWeight;
		this.color = color;
	}
	
}
