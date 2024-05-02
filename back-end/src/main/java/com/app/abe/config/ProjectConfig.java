package com.app.abe.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;
@Configuration
public class ProjectConfig {
	@Bean
	public Cloudinary getCloudinary() {
		Map config =new HashMap();
		config.put("cloud_name","dqfyfxb2r");
		config.put("api_key","397362191388669");
		config.put("api_secret","cIoEQb4PS6YKToFBzAWmJClYG1o");
		config.put("secure",true);
	return new Cloudinary(config);
	
	}
}
