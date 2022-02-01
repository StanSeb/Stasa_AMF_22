package com.stasa.controllers;

import com.stasa.entities.Report;
import com.stasa.entities.User;
import com.stasa.repositories.ReportRepository;
import com.stasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/report")
    public void makeReport(@RequestBody Report report) {
        System.out.println("INCOMING REPORT");
        // var loggedUser = userService.whoAmI();
        var reporter = new User();
        reporter.setId(36);
        report.setReporter(reporter);
        System.out.println(report);

        reportRepository.save(report);
    }

}
