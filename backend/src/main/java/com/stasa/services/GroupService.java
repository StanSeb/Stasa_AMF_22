package com.stasa.services;

import com.stasa.entities.Group;
import com.stasa.repositories.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@Service
@CrossOrigin(origins = "http://localhost:3000")
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    public String addGroup(Group group) {
        List<Group> filteredGroup = groupRepo.findAll();
        String response = "successful";
        for (Group filter : filteredGroup) {
            if (filter.getTitle().equalsIgnoreCase(group.getTitle())) {
                response = "failed";
            }
        }
        if (response.equalsIgnoreCase("successful")) {
            groupRepo.save(group);
            return response;
        }
        return response;
    }

    public List<Group> findAll() { return groupRepo.findAll(); }
    public String leaveGroup(long id, long groupID) {
        groupRepo.leaveGroup(id, groupID);
        return "Användare lämnade gruppen!";
    }

    public List<Group> getByUserId(long userId) {
        return groupRepo.getByUserId(userId);}

    public List<Map> getGroupById(long groupId) {
        return groupRepo.getGroupById(groupId);
    }
    public String getRole(long group_id, long id) {
        return groupRepo.getMemberStatus(group_id, id);
    }

    public Group findById(long id) {
        System.out.println(id);
        return groupRepo.findById(id);
    }
}
