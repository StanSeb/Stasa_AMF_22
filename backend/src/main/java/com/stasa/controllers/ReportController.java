package com.stasa.controllers;

import com.stasa.entities.Report;
import com.stasa.entities.ReportType;
import com.stasa.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report/{user_id}")
    public Report makeReport(@RequestBody Report report, @PathVariable long user_id) throws Exception {
        return reportService.makeReport(report, user_id);
    }

    @DeleteMapping("/report")
    public boolean deleteReport(@RequestBody Report report) {
        return reportService.deleteReport(report);
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

    @GetMapping("/reports/types")
    public List<ReportType> getReportTypes() {
        return reportService.getReportTypes();
    }

}
