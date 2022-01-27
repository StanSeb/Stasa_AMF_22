package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);

    //test                                                                              MUY IMPORTANTE
    @Query(value = "SELECT user_name FROM users WHERE users.verification_code=:code", nativeQuery = true)
    User findByVerificationCode(@Param("code") String code);
}
