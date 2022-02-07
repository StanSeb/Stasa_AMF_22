package com.stasa.repositories;

import com.stasa.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface MemberRepo extends JpaRepository<Member, Integer> {

    //Kollar om en user är redan member i en group
    @Query(value= "Select COUNT(id) FROM members WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true)
    int isMember(long memberUserId, long memberGroupId);

    //Hämtar alla member från en group
    @Query(value= "SELECT m.user_id AS id, u.username, r.title AS privilege \n" +
            "FROM members m\n" +
            "INNER JOIN users u on u.id = m.user_id\n" +
            "INNER JOIN `groups` g on g.id = m.group_id\n" +
            "INNER  JOIN member_roles r on r.id = m.role_id\n" +
            "WHERE m.group_id = ?1\n" +
            "GROUP BY m.user_id", nativeQuery = true )
    List<Map> getMembersByGroupId(long groupId);

    //Räknar antal moderator som en group har
    @Query(value= "Select COUNT(id) FROM members WHERE group_id = ?1 AND role_id = ?2", nativeQuery = true)
    int countModeratorsInGroup(long groupId, long roleId);

    //Updaterar en user till moderator
    @Query(value= "UPDATE members SET role_id = ?1 WHERE user_id = ?2 AND group_id = ?3", nativeQuery = true)
    void updateMemberRole(long roleId, long userId, long groupId);

    List<Member> getByUserId(int userId);
}