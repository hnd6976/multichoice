package com.app.abe.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.abe.models.VerificationToken;
import com.app.abe.security.password.PasswordResetToken;

/**
 * @author Sampson Alfred
 */

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
    VerificationToken findByToken(String token);
    @Query("SELECT v FROM VerificationToken v WHERE v.user.id=?1")
    Optional<VerificationToken>  findByUserId(Long id);
    }
