package com.stasa.controllers;

import com.stasa.entities.Report;
import com.stasa.repositories.ReportRepository;
import com.stasa.services.ReportService;
import com.stasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/report")
    public boolean makeReport(@RequestBody Report report) throws Exception {
        return reportService.makeReport(report);
    }

    @GetMapping("/reports")
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    @GetMapping("/reports/{user_id}")
    public List<Report> getReports(@PathVariable int user_id) {
        return reportService.getReports(user_id);
    }

}
