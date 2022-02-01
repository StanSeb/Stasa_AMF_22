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




    public String addGroup(Group group) {
        List <Group> filteredGroup = groupRepo.findAll();
        String response = "successful";
        for(Group filter : filteredGroup){
            if(filter.getTitle().equalsIgnoreCase(group.getTitle())){
                response = "failed";

            }


        }

        if (response == "successful")
            groupRepo.save(group);

        return response;    }

    public List<Group> findAll() {
        return groupRepo.findAll();
    }

    public List<Group> getByUserid(int userid) {
        return groupRepo.findByUserid(userid);
    }
}
