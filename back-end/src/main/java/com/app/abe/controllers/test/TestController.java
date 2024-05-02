package com.app.abe.controllers.test;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.abe.models.Input;
import com.app.abe.objects.Section;
import com.app.abe.objects.Style;
import com.app.abe.repositories.InputRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin(origins = "*",allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
public class TestController {
	@Autowired
	private InputRepository inpRepo;
	@GetMapping("/init")
	public Input init(){
		Input input=new Input();
		List<List<String>> list = new ArrayList<>();
		List<String> innerList= new ArrayList<>();
		innerList.add("ok");
		innerList.add("ok");
	    list.add(innerList);
	    list.add(innerList);
		input.setSections(list);
		inpRepo.save(input);
		Section sec=new Section();
		
		Style style= new Style("underline","italic","bold","red");
		ObjectMapper mapper = new ObjectMapper();
		
		try {
			System.out.print(mapper.writeValueAsString(innerList));
		} catch (Exception e) {
			// TODO: handle exception
		}
		return input;
	}
	@GetMapping("/getById/{id}")
	public Input getById(@PathVariable("id") Integer id){
	
		return inpRepo.findById(id).orElseThrow();
		
	}
}
