package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rest/groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("getGroupsByUserId/{userId}")
    public List <Group> getByUserId(@PathVariable long userId){
        return groupService.getByUserId(userId);
    }

    @GetMapping("/getAllGroups")
    public List <Group> getAll(){
        return groupService.findAll();
    }

    @PostMapping("/register/group")
    public String register(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @GetMapping("/getUserRole/{group_id}/{id}")
    public String getGroupRole(@PathVariable long group_id, @PathVariable long id){
        return groupService.getRole(group_id, id);
    }
    @GetMapping("/leaveGroup/{id}/{groupID}")
    public String leaveGroup(@PathVariable long id, @PathVariable long groupID){
        return groupService.leaveGroup(id, groupID);
    }

    @GetMapping("/getById/{id}")
    public Group findById(@PathVariable long id){
        return groupService.findById(id);
    }

    @GetMapping("/getGroupBy/{groupId}")
    public List<Map> getGroupById(@PathVariable long groupId) { return groupService.getGroupById(groupId); }


    @PutMapping("/deleteGroup/{id}")
    public Group deleteGroup(@PathVariable long id){
        return groupService.deleteGroup(id);
    }


    //@GetMapping to get all activeGroups
    @GetMapping("getAllActiveGroups")
    public List <Group> getAllActiveGroups(){
        return groupService.getAllActiveGroups();
    }



}




