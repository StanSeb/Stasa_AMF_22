package com.stasa.repositories;

import com.stasa.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@Repository
@CrossOrigin(origins = "http://localhost:3000")
public interface GroupRepo extends JpaRepository <Group, Long> {

    @Query(value= "SELECT id, title, description FROM `groups` WHERE id = ?", nativeQuery = true )
    List<Map> getGroupById(long groupId);

    List<Group> getByUserId(int userid);

    @Query(value = "SELECT groups.id, groups.title, groups.description "+
            "FROM groups INNER JOIN members "+
            "ON members.group_id = groups.id "+
            "WHERE " +
            "AND members.user_id = ?1", nativeQuery = true )
             List<Group> findByUserId(int userid);
}


