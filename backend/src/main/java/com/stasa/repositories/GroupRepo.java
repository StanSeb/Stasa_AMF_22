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
}
