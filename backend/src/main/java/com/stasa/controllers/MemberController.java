package com.stasa.controllers;

import com.stasa.entities.Member;
import com.stasa.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MemberController {

    @Autowired
    MemberService memberService;

    @GetMapping("getAllMembers")
    public List<Member> getallMembers() {
        return memberService.getAll();
    }

    @GetMapping("GetMembersByUserId/{userId}")
    public List <Member> getByUserId(@PathVariable int userId){
        return memberService.getByUserId(userId);
    }
}
