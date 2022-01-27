package com.stasa.repositories;

import com.stasa.entities.User;
import com.stasa.entities.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    List<VerificationCode> findByUser(User user);
}