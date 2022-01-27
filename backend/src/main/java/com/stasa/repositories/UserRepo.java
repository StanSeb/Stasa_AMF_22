package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT member_roles.title FROM member_roles, members WHERE members.role_id = member_roles.id",nativeQuery = true)
    String findUserRole();

    User findByUsername(String username);

    //test                                                                              MUY IMPORTANTE
    @Query(value = "SELECT user_name FROM users WHERE users.verification_code=:code", nativeQuery = true)
    User findByVerificationCode(@Param("code") String code);
}
