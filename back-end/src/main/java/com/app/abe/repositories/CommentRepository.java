package com.app.abe.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.abe.models.Comment;
import com.app.abe.models.ERole;
import com.app.abe.models.Role;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
	
}
