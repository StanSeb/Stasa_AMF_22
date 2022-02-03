package com.stasa.repositories;

import com.stasa.entities.Group;
import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface GroupRepo extends JpaRepository <Group, Long> {
    List<Group> getByUserId(int userid);

    @Query(value = "DELETE FROM groups WHERE groups.id =?1 AND groups.user_id =?2", nativeQuery = true)
    Group leaveGroup(long id, long groupID);

    @Query(value = "SELECT groups.id, groups.title, groups.description, members.user_id "+
            "FROM groups INNER JOIN members "+
            "ON members.group_id = groups.id "+
            "WHERE members.user_id = ?1", nativeQuery = true )
    List<Group> findByUserId(long id);
}
