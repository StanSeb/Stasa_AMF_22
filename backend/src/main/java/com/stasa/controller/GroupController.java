package com.stasa.controller;

import com.stasa.models.Group;
import com.stasa.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("groups")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("getforusers")
    @ResponseBody
    public ResponseEntity<List<Group>> getGroupsForUser(@RequestParam String user) {
        return groupService.getUserGroups(user);
    }


    @PostMapping("register")
    public String registerGroup(@RequestBody Group group) throws ExecutionException,
            InterruptedException {
            System.out.println(group);
            return groupService.register(group);

    }
}
