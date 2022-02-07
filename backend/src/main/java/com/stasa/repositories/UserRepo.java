package com.stasa.repositories;

import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT r.title FROM members m INNER JOIN member_roles r ON m.role_id = r.id WHERE m.user_id =?",nativeQuery = true)
    List<String> findUserRole(long userId);

    @Query(value = "SELECT username FROM users WHERE username = ?", nativeQuery = true)
    String findByUsername(String username);

    //MUY IMPORTANTE
    @Query(value = "SELECT * FROM users WHERE users.verification_code=?1", nativeQuery = true)
    User findByVerificationCode(String code);

    @Query(value = "SELECT email FROM users WHERE users.email=?1", nativeQuery = true)
    String findByEmailInDatabase(String email);

    User findByEmail(String email);

    @Query(value = "SELECT CASE WHEN EXISTS (SELECT * FROM priviledge WHERE priviledge.user_id = ?) THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
    boolean findAdminById(long id);
}
