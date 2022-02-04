package com.stasa.repositories;

import com.stasa.entities.Report;
import com.stasa.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    /**
     * Target type is '1' for user (as in database)
     * @param userId
     */
    @Transactional
    @Query(value = """
        SELECT COUNT(id) FROM reports WHERE target_type = 1 AND target_id = :target_id""", nativeQuery = true
    )
    void countReportsByTargetUser(@Param("target_id") long userId);

    @Transactional
    @Query(value = """
        SELECT * FROM reports WHERE target_type = 1 AND target_id = :target_id""", nativeQuery = true
    )
    List<Report> findReportsByTargetUser(@Param("target_id") long userId);

}