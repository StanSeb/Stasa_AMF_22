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

    List<Group> getByUserId(long userId);
}


