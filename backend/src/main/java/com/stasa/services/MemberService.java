package com.stasa.services;

import com.stasa.entities.Member;
import com.stasa.repositories.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    @Autowired
    MemberRepo memberRepo;

    public List<Member> getAll() {
        return memberRepo.findAll();
    }

    public List<Member> getByUserId(int userId) {
        return memberRepo.getByUserId(userId);
    }

    public Member register(Member member) {
        return memberRepo.save(member);
    }


}
