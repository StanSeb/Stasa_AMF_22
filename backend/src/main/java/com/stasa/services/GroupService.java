package com.stasa.services;

import com.stasa.entities.Group;
import com.stasa.repositories.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

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
        return groupRepo.getByUserId(userId);
    }

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

    public Group deleteGroup(long id) {
        Group groupFromDB = findById(id);
        Date date = Calendar.getInstance().getTime();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
        String timeStamp = dateFormat.format(date);

        if (groupFromDB != null) {
            groupFromDB.setDeletionTimestamp(timeStamp);
            return groupRepo.save(groupFromDB);
        }

        return null;
    }

    public List<Group> getAllActiveGroups() {
        List <Group> allGroups = groupRepo.findAll();
        List <Group> activeGroups = new ArrayList<>();
        for (Group filter: allGroups){
            if(filter.getDeletionTimestamp() ==null){
                activeGroups.add(filter);
            }
        }
        return activeGroups;
    }

}
