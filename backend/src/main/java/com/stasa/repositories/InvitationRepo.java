package com.stasa.repositories;

import com.stasa.entities.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public interface InvitationRepo extends JpaRepository<Invitation, Long> {

    @Query(value= "SELECT i.id, g.title, g.id AS groupId, u.username" +
            " FROM invitations i" +
            " INNER JOIN groups g ON g.id = i.group_id" +
            " INNER JOIN users u ON u.id = (SELECT members.user_id FROM members WHERE members.id = i.from_member_id)" +
            " WHERE i.to_user_id = ?", nativeQuery = true )
    ArrayList<Map> getByUserId(long userId);

    @Query(value = "SELECT CASE WHEN EXISTS" +
            " (SELECT * FROM invitations WHERE group_id = ?1 AND to_user_id = ?2)" +
            " THEN 'TRUE'" +
            " ELSE 'FALSE'" +
            " END", nativeQuery = true)
    boolean getIsUserInvited(long groupId, long userId);
}
