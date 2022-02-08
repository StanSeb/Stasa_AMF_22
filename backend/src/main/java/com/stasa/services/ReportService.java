package com.stasa.services;

import com.stasa.entities.EReportType;
import com.stasa.entities.Report;
import com.stasa.repositories.CommentRepo;
import com.stasa.repositories.GroupRepo;
import com.stasa.repositories.ReportRepo;
import com.stasa.repositories.ThreadRepo;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    public ReportRepo reportRepository;

    @Autowired
    public UserService userService;

    @Autowired
    GroupRepo groupRepo;

    @Autowired
    ThreadRepo threadRepo;

    @Autowired
    CommentRepo commentRepo;

    public Report makeReport(Report report) throws Exception {
        // return reportRepository.
        var loggedUser = userService.whoAmI();
        report.setReporter(loggedUser);

        long reporterId = loggedUser.getId();
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
                if(!doesGroupExist(targetId))
                    throw new Exception("Thread doesn't exist.");
                break;
            case USER:
                if(!doesUserExist(targetId))
                    throw new Exception("User doesn't exist.");
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

    private boolean doesCommentExist(long id) {
        return commentRepo.findById(id).isPresent();
    }

    private boolean doesGroupExist(long id) {

        return groupRepo.findById(id)!=null;
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

}
