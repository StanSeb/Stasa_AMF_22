package com.stasa.repositories;

import com.stasa.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GroupRepo extends JpaRepository <Group, Long> {


    @Query(value = "SELECT groups.id, groups.title, groups.description " +
            "FROM groups INNER JOIN members INNER JOIN member_roles INNER JOIN users "+
            "ON groups.id = members.group_id "+
            "AND members.role_id = member_roles.id "+
            "AND members.user_id = users.id "+
            "WHERE members.user_id = ?1 ", nativeQuery = true)
             List<Group> findByUserId(int user_id);
}
