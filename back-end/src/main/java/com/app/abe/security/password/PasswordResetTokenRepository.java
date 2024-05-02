package com.app.abe.security.password;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String passwordResetToken);
    @Query("SELECT p FROM PasswordResetToken p WHERE p.user.id=?1")
    Optional<PasswordResetToken> findByUserId(Long id);
}
