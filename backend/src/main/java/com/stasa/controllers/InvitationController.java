package com.stasa.controllers;

import com.stasa.entities.Invitation;
import com.stasa.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

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

    @GetMapping("/rest/invitations/{userId}")
    public ArrayList<Map> getUserInvitations(@PathVariable Long userId){
        return invitationService.getUserInvitations(userId);
    }

    @DeleteMapping("/rest/deleteInvitation/{id}")
    public void deleteInvitation(@PathVariable Long id) {invitationService.deleteInvitation(id);}
}