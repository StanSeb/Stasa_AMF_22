package com.stasa.controllers;

import com.stasa.entities.Member;
import com.stasa.entities.User;
import com.stasa.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    //Get method to retrieve data from Members, Member roles, group and user table
    @GetMapping("GetMembersByUserId/{userId}")
    public List <Member> getByUserId(@PathVariable int userId){
        return memberService.getByUserId(userId);
    }

    @PostMapping("register/member")
    public Member registerMember(@RequestBody Member member) {
        return memberService.register(member);
    }



}
