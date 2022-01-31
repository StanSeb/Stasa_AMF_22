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


    public String addGroup(Group group) {
        List <Group> filteredGroup = groupRepo.findAll();
        String response = "successful";
        for(Group filter : filteredGroup){
            System.out.println(filter.getTitle());
            if(filter.getTitle().equalsIgnoreCase(group.getTitle())){
                response = "failed";

            }


        }
        System.out.println(group.getTitle());

        if (response == "successful")
            groupRepo.save(group);

        return response;    }
}
