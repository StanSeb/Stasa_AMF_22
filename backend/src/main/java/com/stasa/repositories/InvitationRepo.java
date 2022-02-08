package com.stasa.repositories;

import com.stasa.entities.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public interface InvitationRepo extends JpaRepository<Invitation, Long> {
    @Query(value= "SELECT i.id, g.title, u.username" +
            " FROM invitations i" +
            " INNER JOIN groups g ON g.id = i.group_id" +
            " INNER JOIN users u ON u.id = g.user_id" +
            " WHERE i.to_user_id = ?", nativeQuery = true )
    ArrayList<Map> getByUserId(long userId);
}
