package com.stasa.repositories;

import com.stasa.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GroupRepo extends JpaRepository <Group, Long> {


    @Query(value = "SELECT groups.id, groups.title, groups.description "+
            "FROM groups INNER JOIN members "+
            "ON members.group_id = groups.id "+
            "WHERE " +
            "AND members.user_id = ?1", nativeQuery = true )
             List<Group> findByUserId(int userid);
}
