package com.stasa.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Integer> {
    List<VerificationCode> findByUser(User user);
}