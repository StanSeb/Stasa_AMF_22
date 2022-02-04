package com.stasa.services;

import com.stasa.entities.Member;
import com.stasa.entities.User;
import com.stasa.repositories.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        User loggedUser = userService.whoAmI();
        long memberUserId = member.getUser().getId();
        long memberGroupId = member.getGroup().getId();
        //if(loggedUser != null){
            int membership = memberRepo.isMember( memberUserId, memberGroupId );  //Kollar om user är redan member i en group
            if (membership == 0){
                memberRepo.save(member);
                response = "Du har lagts till i den begärda gruppen!!";
            } else {
                response = "Du är redan medlem av den här gruppen. Vi kan inte lägga till dig igen!";
            }
        //}else{
        //    response = "För att vara medlem i en grupp måste du vara inloggad på ditt konto. Logga in och försök igen!";
        //}
        return response;
    }

    //Hämtar alla member från en group
    public List<Map> getMembersByGroupId(long groupId) {
        return memberRepo.getMembersByGroupId(groupId);
    }

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