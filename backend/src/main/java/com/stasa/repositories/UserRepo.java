package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT member_roles.title FROM member_roles, members WHERE members.role_id = " +
            "member_roles.id AND members.user_id = ?",nativeQuery = true)
    String findUserRole(long id);

    @Query(value = "SELECT user_name FROM users WHERE user_name = ?", nativeQuery = true)
    String findByUsername(String username);

    //MUY IMPORTANTE
    @Query(value = "SELECT * FROM users WHERE users.verification_code=?1", nativeQuery = true)
    User findByVerificationCode(String code);

    @Query(value = "SELECT * FROM users WHERE users.email=?1", nativeQuery = true)
    User findByEmailInDatabase(String email);

    User findByEmail(String email);
}
