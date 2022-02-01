package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("/rest/getGroupById/{groupId}")
    public List<Map> getGroupById(@PathVariable long groupId) { return groupService.getGroupById(groupId); }

}
