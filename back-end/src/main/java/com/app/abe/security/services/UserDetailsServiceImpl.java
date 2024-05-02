package com.app.abe.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.abe.models.User;
import com.app.abe.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user;
		
			
				user = userRepository.findByEmail(username).
						orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
			
		

		return UserDetailsImpl.build(user);
	}

}
