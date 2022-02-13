package com.stasa.repositories;

import com.stasa.entities.Member;
import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface MemberRepo extends JpaRepository<Member, Long> {

    //Kollar om en user är redan member i en group
    @Query(value= "Select COUNT(id) FROM members WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true)
    int isMember(long memberUserId, long memberGroupId);

    List<Member> getByUserId(long userId);

    //Hämtar alla member från en group UTOM members som finns i Blacklist
    @Query(value= "SELECT m.id, m.user_id AS userId, u.username, m.group_id AS groupId, g.title, r.title AS role \n" +
            "FROM members m\n" +
            "INNER JOIN users u on u.id = m.user_id\n" +
            "INNER JOIN `groups` g on g.id = m.group_id\n" +
            "INNER  JOIN member_roles r on r.id = m.role_id\n" +
            "WHERE m.group_id = ?1 AND m.user_id NOT IN (SELECT user_id FROM blacklist WHERE group_id = ?1)", nativeQuery = true )
    List<Map> getMembersByGroupId(long groupId);

    //Räknar antal moderator som en group har
    @Query(value= "Select COUNT(id) FROM members WHERE group_id = ?1 AND role_id = ?2", nativeQuery = true)
    int countModeratorsInGroup(long groupId, long roleId);

    //Update från user till moderator och vice-versa
    @Query(value= "UPDATE members SET role_id = ?1 WHERE user_id = ?2 AND group_id = ?3", nativeQuery = true)
    void updateMemberRole(long roleId, long userId, long groupId);

    @Query(value = "SELECT COUNT(user_id) FROM blacklist WHERE user_id= ?1", nativeQuery = true)
    int countBlockedTimes(long userId);

    @Query(value = "insert into blacklist (user_id, amount_blocked, to_date, group_id) Values (?1, ?2, ?3, ?4)", nativeQuery = true)
    void insertInBlacklist(long userId, int block, LocalDateTime oneWeek, long groupId);

    @Query(value = "DELETE FROM members WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true)
    void userBlockedFromGroup(long userId, long groupId);

    @Query(value = "DELETE FROM blacklist WHERE user_id = ?1 AND group_id = ?2", nativeQuery = true)
    void deleteUserBlacklist(long userId, long groupId);

    @Query(value = "SELECT b.user_id As user_id, b.group_id AS groupId, u.username, g.title, b.from_date, b.to_date \n" +
            "FROM blacklist b \n" +
            "INNER JOIN users u ON b.user_id = u.id\n" +
            "INNER JOIN `groups` g ON g.id = b.group_id \n" +
            "WHERE b.user_id = ?1", nativeQuery = true)
    List<Map> getblockedGroups(long userId);

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