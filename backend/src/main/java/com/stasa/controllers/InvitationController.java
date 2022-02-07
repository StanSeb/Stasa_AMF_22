package com.stasa.controllers;

import com.stasa.entities.Invitation;
import com.stasa.services.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController("/rest")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;

    @PostMapping("/invite")
    public String inviteUserToGroup(@RequestBody Invitation invitation){
        return invitationService.inviteUserToGroup(invitation);
    }
}
