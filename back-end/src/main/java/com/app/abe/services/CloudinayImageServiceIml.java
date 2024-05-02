package com.app.abe.services;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class CloudinayImageServiceIml implements CloudinaryImageService {
	@Autowired
	private Cloudinary cloudinary;
	@Override
	public Map upload(MultipartFile file) {
		try {
			Map data=this.cloudinary.uploader().upload(file.getBytes(), Map.of());
			System.out.print(data);
			return data;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("fail");
		}	
	}
	@Override
	public Map destroy(String public_id) {
		try {
			Map data=this.cloudinary.uploader().destroy(public_id, Map.of());
			System.out.print(data);
			return data;
		} catch (IOException e) {
			// TODO Auto-generated catch block
			throw new RuntimeException("fail");
		}	
	}
}
