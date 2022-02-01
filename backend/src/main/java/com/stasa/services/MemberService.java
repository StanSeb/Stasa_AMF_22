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
        User memberUser = member.getUser();
        long memberUserId = member.getUser().getId();
        long memberGroupId = member.getGroup().getId();

        System.out.println("whoAmI " + loggedUser);
        System.out.println("member " + memberUser);
        //if(loggedUser == memberUser){
            int membership = memberRepo.isMember( memberUserId, memberGroupId );
            if (membership == 0){
                memberRepo.save(member);
                response = "You have been successfully added to the requested group!";
            } else {
                response = "You are already part of this group. We can't add you again!";
            }
        //}else{
        //    response = "To be a member of a group you have to be logged into your account. Logg in and try again!";
        //}
        return response;
    }

    public List<Map> getMembersByGroupId(long groupId) {
        return memberRepo.getMembersByGroupId(groupId);
    }
}