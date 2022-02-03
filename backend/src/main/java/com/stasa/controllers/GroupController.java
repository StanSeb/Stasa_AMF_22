package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@RequestMapping("private")

public class GroupController {


    @Autowired
    private GroupService groupService;

    @GetMapping("/rest/getByUserId/{userid}")
    public List<Group> getByUserId(@PathVariable int userid) {
        return groupService.getByUserId(userid); }

    @PostMapping("/register/group")
    public Group register(@RequestBody Group group) {

        return groupService.addGroup(group);
    }

    @GetMapping("/leaveGroup/{id}/{groupID}")
    public String leaveGroup(@PathVariable long id, @PathVariable long groupID){
        return groupService.leaveGroup(id, groupID);
    }

}
