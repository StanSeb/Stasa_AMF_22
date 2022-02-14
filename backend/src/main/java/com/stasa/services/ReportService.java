package com.stasa.services;

import com.stasa.entities.*;
import com.stasa.entities.Thread;
import com.stasa.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    @Autowired
    public ReportRepo reportRepository;

    @Autowired
    public UserService userService;

    @Autowired
    public MemberService memberService;

    @Autowired
    public MemberRepo memberRepo;

    @Autowired
    GroupRepo groupRepo;

    @Autowired
    ThreadRepo threadRepo;

    @Autowired
    CommentRepo commentRepo;

    @Autowired
    ReportTypeRepository reportTypeRepo;

    public Report makeReport(Report report, long reporterId) throws Exception {
        // var loggedUser = userService.whoAmI(); <-- funkar inte (antagligen pga login-implementationen)
        User reporter = new User();
        reporter.setId(reporterId);
        report.setReporter(reporter);

        long targetId = report.getTargetId();

        // Validate report target.
        switch (report.getTargetType().toEnum()) {
            case COMMENT:
                if(!doesCommentExist(targetId))
                    throw new Exception("Comment doesn't exist.");
                break;
            case GROUP:
                if(!doesGroupExist(targetId))
                    throw new Exception("Group doesn't exist.");
                break;
            case THREAD:
                if(!doesThreadExist(targetId))
                    throw new Exception("Thread doesn't exist.");
                break;
            case MEMBER:
                if(!doesMemberExist(targetId))
                    throw new Exception("Member doesn't exist.");
                if(reporterId == targetId)
                    throw new Exception("You can't report yourself");
                break;
            default:
                throw new Exception("Invalid target for report.");
        }

        try {
            return reportRepository.save(report);
        } catch (Exception e) {
            // fixa bättre error handling?
            throw new Exception("Could not submit report. This could be because you've already submitted one with the same target.");
        }
    }

    private boolean doesUserExist(long id) {
        return userService.findById(id).isPresent();
    }

    private boolean doesMemberExist(long id) {
        return memberRepo.findById(id).isPresent();
    }

    private boolean doesCommentExist(long id) {
        return commentRepo.findById(id).isPresent();
    }

    private boolean doesGroupExist(long id) {
        return groupRepo.findById(id) != null;
    }

    private boolean doesThreadExist(long id) {
        return threadRepo.findById(id).isPresent();
    }

    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }

    public List<Report> getCommittedReportsByUser(long userId) throws Exception {
        return reportRepository.findReportsByTargetUser(userId);
    }

    public List<Report> getReceivedReportsForUser(long userId) throws Exception {
        return reportRepository.findReportsByTargetUser(userId);
    }

    public List<ReportType> getReportTypes() {
        return reportTypeRepo.findAll();
    }

    /**
     * @return if the report could be deleted
     */
    public boolean deleteReport(Report report) {
        reportRepository.delete(report);
        var deletedReport = reportRepository.findById(report.getId());
        return deletedReport.isEmpty();
    }

    public List<Report> getRelevantReports(long userId) {
        var allReports = this.getAllReports();
        var relevantReports = new ArrayList<Report>();

        System.out.println("ALL REPORTS:");
        for(Report report : allReports) {
            System.out.println("Reporter: " + report.getReporter().getUsername() + " | Target: " + report.getTargetType().getName() + " with ID " + report.getTargetId() + " | Description: " + report.getDescription());
        }
        System.out.println("--------------");

        var loggedInUser = userService.findById(userId).orElse(null);

        if(loggedInUser == null) {
            // Returnera inget ifall användaren inte hittas.
            System.out.println("Logged in user was NULL (bad)");
            return null;
        }

        System.out.println("Logged in user: " + loggedInUser.getUsername());

        if(isUserSuperAdmin(loggedInUser)) {
            // Return all reports if user is super admin.
            return allReports;
        }

        for(Report report : allReports) {
            EReportType targetType = report.getTargetType().toEnum();
            long targetId = report.getTargetId();

            boolean authorized = switch (targetType) {
                case MEMBER -> isUserAuthorizedToHandleMemberReport(loggedInUser, targetId);
                case THREAD -> isUserAuthorizedToHandleThreadReport(loggedInUser, targetId);
                case COMMENT -> isUserAuthorizedToHandleCommentReport(loggedInUser, targetId);
                case GROUP -> false; // Only if user is super admin which is checked above.
            };

            if(authorized) {
                relevantReports.add(report);
            }
        }

        return relevantReports;
    }

    private boolean isUserAuthorizedToHandleCommentReport(User loggedInUser, long targetId) {
        // 1. get comment thread
        // 2. get thread group
        // 3. check if loggedInUser is member of thread group
        // 4. check if loggedInUser is authorized

        Comment comment = commentRepo.findCommentById(targetId);
        if(comment == null) return false;
        Thread commentThread = threadRepo.findById(comment.getThreadId()).orElse(null);
        if(commentThread == null) return false;
        Group commentGroup = groupRepo.findById(commentThread.getGroupId());
        if(commentGroup == null) return false;

        var loggedInUserAsMemberInCommentGroup = getUserAsMember(loggedInUser, commentGroup);
        if(loggedInUserAsMemberInCommentGroup == null) return false;

        return isRoleAuthorized(getMemberRole(loggedInUserAsMemberInCommentGroup));
    }

    private boolean isRoleAuthorized(String userRole) {
        return switch (userRole) {
            case "ADMIN", "GROUPMODERATOR", "GROUPADMIN" -> true;
            default -> false;
        };
    }

    private boolean isUserGroupCreator(Group group, User user) {
        if(group.getUserId() == user.getId()) {
            // User är admin i gruppen.
            System.out.println("User " + user.getUsername() + " is ADMIN of the group " + group.getTitle());
            return true;
        }
        return false;
    }

    private Map getUserAsMember(User user, Group group) {
        // Get the user as a member in the specified group.
        var userAsMemberMap = memberRepo.getMemberIdByUserId(user.getId(), group.getId());
        if(userAsMemberMap == null || userAsMemberMap.get("role") == null) {
            // User is not member in group at all. Don't show the report.
            System.out.println("User " + user.getUsername() + " is not a member in the group " + group.getTitle());
            return null;
        } else {
            return userAsMemberMap;
        }
    }

    private String getMemberRole(Map memberMap) {
        return (String)memberMap.get("role");
    }

    private boolean isUserSuperAdmin(User user) {
        return userService.isAdmin(user.getId());
    }

    private boolean isUserAuthorizedToHandleThreadReport(User loggedInUser, long targetId) {
        // User is authorized if he/she is a member in the group
        // with the provided ID and is ADMIN or has an authorized role.

        var thread = threadRepo.findById(targetId).orElse(null);
        if(thread == null) return false;
        var threadGroup = groupRepo.findById(thread.getGroupId());

        var userAsMember = getUserAsMember(loggedInUser, threadGroup);
        if(userAsMember == null) return false;

        return isRoleAuthorized(getMemberRole(userAsMember));
    }

    private boolean isUserAuthorizedToHandleMemberReport(User user, long memberId) {
        var member = memberRepo.findById(memberId).orElse(null);

        if(member == null) return false;

        var memberGroup = member.getGroup();
        if(isUserGroupCreator(memberGroup, user)) {
            return true;
        }

        var userAsMemberMap = getUserAsMember(user, memberGroup);
        if(userAsMemberMap == null) {
            // User is not present as a member in the group.
            return false;
        }

        String loggedUserRole = userAsMemberMap.get("role").toString();

        System.out.println("LOGGED IN USER " + user.getUsername() +  " IS " + loggedUserRole + " IN GROUP " + memberGroup.getTitle());

        if(isRoleAuthorized(loggedUserRole)) {
            System.out.println("The user " + user.getUsername() + " is authorized to handle user reports in the group " + memberGroup.getTitle());
            return true;
        } else {
            System.out.println("The user " + user.getUsername() + " is NOT authorized to handle user reports in the group " + memberGroup.getTitle());
            return false;
        }
    }
}
