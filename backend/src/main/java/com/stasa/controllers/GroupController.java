package com.stasa.controllers;

import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("private")
public class GroupController {


    @Autowired
    private GroupService groupService;

    @GetMapping("/rest/getByUserId/{userid}")
    public List<Group> getByUserId(@PathVariable int userid) {
        return groupService.getByUserId(userid); }

    @PostMapping("/register/group")
    public String register(@RequestBody Group group) {

        return groupService.addGroup(group);
    }

}
