package com.stasa.services;


import com.stasa.entities.Group;
import com.stasa.repositories.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    public List<Group> getByUserId( int userid) {
        return groupRepo.getByUserId(userid);
    }


    public Group addGroup(Group group) {
        return groupRepo.save(group);
    }

    public String leaveGroup(long id, long groupID) {
        groupRepo.leaveGroup(id, groupID);
        return "Användare lämnade gruppen!";
    }
}
