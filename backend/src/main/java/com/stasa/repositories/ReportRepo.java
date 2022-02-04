package com.stasa.repositories;

import com.stasa.entities.Report;
import com.stasa.entities.User;
import com.sun.istack.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Index;
import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ReportRepo extends JpaRepository<Report, Long> {

    /**
     * Target type is '1' for user (as in database)
     */
    @Transactional
    @Query(value = """
        SELECT COUNT(id) FROM reports WHERE target_type = 1 AND target_id = :target_id""", nativeQuery = true
    )
    void countUserReceivedReports(@Param("target_id") long userId);

    @Transactional
    @Query(value = """
        SELECT * FROM reports WHERE target_type = 1 AND target_id = :target_id""", nativeQuery = true
    )
    List<Report> findReportsByTargetUser(@Param("target_id") long userId);

    // OBS! Detta är inte en native query.
    @Transactional
    @Query(value = "SELECT * FROM reports WHERE target_id = 1 AND reporter_id = ?", nativeQuery = true)
    List<Report> findReportedUsersByReporter(long reporterId);

}