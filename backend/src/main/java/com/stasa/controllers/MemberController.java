package com.stasa.controllers;

import com.stasa.entities.Member;
import com.stasa.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/rest/member")
public class MemberController {
        @Autowired
        private MemberService memberService;

        @PostMapping("/join")
        public String addMember(@RequestBody Member member) {return memberService.addMember(member); }

        @GetMapping("/memberByGroupId/{groupId}")
        public List<Map> getMembersByGroupId(@PathVariable long groupId) {return memberService.getMembersByGroupId(groupId); }
    @GetMapping("getAllMembers")
    public List<Member> getallMembers() {
        return memberService.getAll();
    }

    //Get method to retrieve data from Members, Member roles, group and user
    @GetMapping("GetMembersByUserId/{userId}")
    public List <Member> getByUserId(@PathVariable int userId){
        return memberService.getByUserId(userId);
    }

    @PostMapping("register/member")
    public Member registerMember(@RequestBody Member member) {
        return memberService.register(member);
    }
}