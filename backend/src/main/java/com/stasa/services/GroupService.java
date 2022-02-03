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
        List <Group> filteredGroup = groupRepo.findAll();
        String response = "successful";
        for(Group filter : filteredGroup){
            if(filter.getTitle().equalsIgnoreCase(group.getTitle())){
                response = "failed";}       }
            if (response == "successful")
            groupRepo.save(group);
                return response;    }

    public List<Group> findAll() { return groupRepo.findAll();  }

    public List<Group> getByUserId(int userid) {
        return groupRepo.findByUserId(userid);
        
    }

    public List<Map> getGroupById(long groupId) {
        return groupRepo.getGroupById(groupId);
    }
}
