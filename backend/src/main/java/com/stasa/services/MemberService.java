package com.stasa.services;

import com.stasa.entities.Member;
import com.stasa.repositories.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class MemberService {
    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private UserService userService;

    public String addMember(Member member) {
        String response;
        long memberUserId = member.getUser().getId();
        long memberGroupId = member.getGroup().getId();
        int membership = memberRepo.isMember( memberUserId, memberGroupId );  //Kollar om user är redan member i en group eller inte
            if (membership == 0){
                memberRepo.save(member); // Sparas i Databasen som en ny member i en group
                response = "Du har lagts till i den begärda gruppen!!";
            } else {
                response = "Du är redan medlem av den här gruppen. Vi kan inte lägga till dig igen!";
            }
        return response;
    }

    //Hämtar alla member från en group
    public List<Map> getMembersByGroupId(long groupId) {
        return memberRepo.getMembersByGroupId(groupId);
    }

    public List<Member> getAll() {
        return memberRepo.findAll();
    }

    public List<Member> getByUserId(long userId) {
        return memberRepo.getByUserId(userId);
    }

    public Member register(Member member) {
        return memberRepo.save(member);
    }

    public ArrayList<Map> getMemberIdByUserId(Long userId, Long groupId) {
        return memberRepo.getMemberIdByUserId(userId, groupId);
    }
}