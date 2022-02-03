package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("getGroupsByUserId/{user_id}")
    public List <Group> getByUserId(@PathVariable int user_id){
        return groupService.getByUserId(user_id);
    }

    @GetMapping("/getAllGroups")
    public List <Group> getAll(){
        return groupService.findAll();
    }

    @PostMapping("/register/group")
    public String register(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @GetMapping("/rest/getGroupById/{groupId}")
    public List<Map> getGroupById(@PathVariable long groupId) { return groupService.getGroupById(groupId); }

}
