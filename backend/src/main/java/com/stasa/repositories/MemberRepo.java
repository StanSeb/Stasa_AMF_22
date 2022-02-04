package com.stasa.repositories;

import com.stasa.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MemberRepo extends JpaRepository<Member, Long> {

    List<Member> getByUserId(int userId);

    // används för att ta bort en användare.
    @Query(value = "Select CASE WHEN EXISTS (SELECT * from members where user_id = ?1 and group_id = ?2) THEN 'TRUE' ELSE 'FALSE' END", nativeQuery = true)
    boolean userInGroup(long userId, long groupId);

    @Query(value ="DELETE from members where user_id =?1 and group_id = ?2", nativeQuery = true )
    String deleteUserInGroup(long userId, long groupId);
}   ////
