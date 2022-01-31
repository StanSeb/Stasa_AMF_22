package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findByUsername(String username);

    //                                                                     MUY IMPORTANTE
    @Query(value = "SELECT * FROM users WHERE users.verification_code=?1", nativeQuery = true)
    User findByVerificationCode(String code);

}
