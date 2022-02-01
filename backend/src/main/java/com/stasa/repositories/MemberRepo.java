package com.stasa.repositories;

import com.stasa.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepo extends JpaRepository<Member, Integer> {

    @Query(value= "Select COUNT(id) FROM members WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true )
    int isMember(long memberUserId, long memberGroupId);
}