package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/groups")
public class GroupController {


    @Autowired
    private GroupService groupService;

    @GetMapping("/getGroupsByUserId/{id}")
    public List <Group> getByUserId(@PathVariable long id){
        return groupService.getByUserId(id);
    }

    @GetMapping("/getAllGroups")
    public List <Group> getAll(){
        return groupService.findAll();
    }

    @PostMapping("/register/group")
    public String register(@RequestBody Group group) {

        return groupService.addGroup(group);
    }

    @GetMapping("/leaveGroup/{id}/{groupID}")
    public String leaveGroup(@PathVariable long id, @PathVariable long groupID){
        return groupService.leaveGroup(id, groupID);
    }

}
