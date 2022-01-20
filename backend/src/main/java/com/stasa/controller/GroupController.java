package com.stasa.controller;

import com.stasa.models.Group;
import com.stasa.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("private")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("groups")
    @ResponseBody
    public ResponseEntity<List<Group>> getGroupsForUser(@RequestParam String user) {
        return groupService.getUserGroups(user);
    }
}
