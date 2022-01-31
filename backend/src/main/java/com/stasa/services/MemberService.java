package com.stasa.services;

import com.stasa.entities.Member;
import com.stasa.repositories.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
    @Autowired
    private MemberRepo memberRepo;

    public void addMember(Member member) {

        System.out.println(member);

        memberRepo.save(member);
    }
}