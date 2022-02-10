package com.stasa.services;

import com.stasa.entities.Member;
import com.stasa.entities.User;
import com.stasa.repositories.MemberRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class MemberService {
    @Autowired
    private MemberRepo memberRepo;

    @Autowired
    private UserService userService;

    //En user blir medlem i en group
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

    //Update från user till moderator och vice-versa
    public String updateMemberRole(Member member) {
        String response = null;
        long userId = member.getUser().getId();
        long groupId = member.getGroup().getId();
        long roleId = member.getMemberRole().getId();
        int moderatorCount = memberRepo.countModeratorsInGroup(groupId, roleId); // Räknar antalet moderatorer som gruppen redan har.

        if(roleId == 3){
            if(moderatorCount >= 5){
                response = "Det går inte att lägga till en ny medorador. Denna grupp har redan det maximala antalet moderatorer!";
            }else {
                memberRepo.updateMemberRole(roleId, userId, groupId); // Updaterar user till moderator baserat på userId och groupId
                response = "Den nya moderatorn har lagts till!";
            }
        }else if(roleId == 4){
            memberRepo.updateMemberRole(roleId, userId, groupId); // Updaterar moderator till user baserat på userId och groupId
            response = "Användaren är inte längre moderator!";
        }
        return response;
    }

    public String sendToBlacklist(Member member) {
        long userId = member.getUser().getId();
        long groupId = member.getGroup().getId();
        String response = null;
        int countBlockedTimes = memberRepo.countBlockedTimes(userId);
        if(countBlockedTimes <1){
            int block = 1;
            LocalDateTime today =  LocalDateTime.now();
            LocalDateTime oneWeek = today.plusDays(7);
            memberRepo.insertInBlacklist(userId, block, oneWeek, groupId);
            memberRepo.userBlockedFromGroup(userId, groupId);
            response = "Den här användaren har blockerats. Den kommer att förbli inaktiv i en vecka.";
        }else if (countBlockedTimes >= 1 || countBlockedTimes >= 4 ) {
            int block = 1;
            LocalDateTime today =  LocalDateTime.now();
            LocalDateTime twoWeek = today.plusDays(30);
            memberRepo.insertInBlacklist(userId, block, twoWeek, groupId);
            memberRepo.userBlockedFromGroup(userId, groupId);
            response = "Den här användaren har blockerats: " + countBlockedTimes+ " gånger. Därför kommer att förbli inaktiv i en månad.";
        }else if (countBlockedTimes >= 5) {
            int block = 1;
            LocalDateTime today =  LocalDateTime.now();
            LocalDateTime months = today.plusMonths(6);
           memberRepo.insertInBlacklist(userId, block, months, groupId);
            memberRepo.userBlockedFromGroup(userId, groupId);
            response = "Den här användaren har blockerats: " + countBlockedTimes+ " gånger. Därför kommer att förbli inaktiv i 6 månad.";
        }
        return response;
    }

    public String deleteUserBlacklist(long userId, long groupId) {
        memberRepo.deleteUserBlacklist(userId, groupId);
        return "Användaren har tillgång till gruppen igen!";
    }
}