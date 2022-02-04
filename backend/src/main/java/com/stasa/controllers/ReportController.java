package com.stasa.controllers;

import com.stasa.entities.Report;
import com.stasa.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public Report makeReport(@RequestBody Report report) throws Exception {
        return reportService.makeReport(report);
    }

    @GetMapping("/reports")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/reports/received/{user_id}")
    public List<Report> getReports(@PathVariable int user_id) throws Exception {
        return reportService.getReceivedReportsForUser(user_id);
    }

    @GetMapping("/reports/committed/{user_id}")
    public List<Report> getCommittedReports(@PathVariable int user_id) throws Exception {
        return reportService.getCommittedReportsByUser(user_id);
    }

}
