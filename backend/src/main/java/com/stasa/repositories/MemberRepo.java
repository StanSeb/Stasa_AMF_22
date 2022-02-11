package com.stasa.repositories;

import com.stasa.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface MemberRepo extends JpaRepository<Member, Integer> {

    //Kollar om en user är redan member i en group
    @Query(value= "Select COUNT(id) FROM members WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true)
    int isMember(long memberUserId, long memberGroupId);
    List<Member> getByUserId(long userId);

    //Hämtar alla member från en group
    @Query(value= "SELECT m.user_id, m.id, u.username, r.title AS role\n" +
            "FROM members m\n" +
            "INNER JOIN users u ON u.id = m.user_id\n" +
            "INNER JOIN groups g ON g.id = m.group_id\n" +
            "INNER JOIN member_roles r ON r.id = m.role_id\n" +
            "WHERE m.group_id = ?\n" +
            "GROUP BY m.user_id", nativeQuery = true )
    List<Map> getMembersByGroupId(long groupId);

    //Räknar antal moderator som en group har
    @Query(value= "Select COUNT(id) FROM members WHERE group_id = ?1 AND role_id = ?2", nativeQuery = true)
    int countModeratorsInGroup(long groupId, long roleId);

    //Update från user till moderator och vice-versa
    @Query(value= "UPDATE members SET role_id = ?1 WHERE user_id = ?2 AND group_id = ?3", nativeQuery = true)
    void updateMemberRole(long roleId, long userId, long groupId);

    List<Member> getByUserId(int userId);

    @Query(value = "SELECT m.id, u.username, r.title AS role FROM members m" +
            " INNER JOIN users u ON u.id = m.user_id INNER JOIN groups g ON g.id = m.group_id" +
            " INNER JOIN member_roles r ON r.id = m.role_id" +
            " WHERE m.user_id = ?1" +
            " AND m.group_id = ?2", nativeQuery = true)
    Map getMemberIdByUserId(Long userId, Long groupId);

    @Query(value= "DELETE FROM members WHERE members.group_id = ?1 AND members.user_id = ?2",nativeQuery = true)
    void deleteById(long groupId,long userId);

    @Query(value = "DELETE FROM members WHERE members.id=?1",nativeQuery = true)
    void deleteByMemberId(int id);
}