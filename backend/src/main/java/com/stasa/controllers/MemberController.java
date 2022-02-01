package com.stasa.controllers;

import com.stasa.entities.Member;
import com.stasa.services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/rest/member")
public class MemberController {
        @Autowired
        private MemberService memberService;

        @PostMapping("/join")
        public String addMember(@RequestBody Member member) {return memberService.addMember(member); }
}