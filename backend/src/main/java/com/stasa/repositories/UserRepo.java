package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT member_roles.title FROM member_roles, members WHERE members.role_id = member_roles.id",nativeQuery = true)
    String findUserRole();

    User findByUsername(String username);

    //                                                                     MUY IMPORTANTE
    @Query(value = "SELECT * FROM users WHERE users.verification_code=?1", nativeQuery = true)
    User findByVerificationCode(String code);

    @Query(value = "SELECT * FROM users WHERE users.email=?1", nativeQuery = true)
    User findByEmailInDatabase(String email);


    User findByEmail(String email);

    @Query(value = "SELECT CASE WHEN EXISTS (SELECT * FROM priviledge WHERE priviledge.user_id = ?) THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
    boolean findAdminById(long id);
}
