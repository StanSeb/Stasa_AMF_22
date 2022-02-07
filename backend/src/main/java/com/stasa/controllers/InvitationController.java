package com.stasa.controllers;

import com.stasa.entities.Invitation;
import com.stasa.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @PostMapping("/rest/invite")
    public String inviteUserToGroup(@RequestBody Invitation invitation){
        System.out.println(invitation.toString());
        return invitationService.inviteUserToGroup(invitation);
    }
}