package com.app.abe.services;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryImageService {
	public Map upload(MultipartFile file);
	public Map destroy(String public_id);
}
