package com.stasa.services;


import com.stasa.entities.Group;
import com.stasa.repositories.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    public List<Group> getByUserId( int userid) {
        return groupRepo.getByUserId(userid);
    }


    public Group addGroup(Group group) {
        return groupRepo.save(group);
    }
}
