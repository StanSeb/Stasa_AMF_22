package com.stasa.repositories;

import com.stasa.entities.Report;
import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    int countReportByTargetUser(User user);

}