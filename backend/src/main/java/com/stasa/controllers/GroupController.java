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

    @GetMapping("rest/getAllGroups")
    public List <Group> getAll(){
        return groupService.findAll();
    }






    @GetMapping("rest/getByUserId/{userid}")
    public List <Group> getByUser(@PathVariable int userid) {
        return groupService.getByUserid(userid);
    }








    @PostMapping("/register/group")
    public String register(@RequestBody Group group) {

        return groupService.addGroup(group);
    }

}
