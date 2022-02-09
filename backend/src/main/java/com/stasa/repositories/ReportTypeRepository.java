package com.stasa.repositories;

import com.stasa.entities.ReportType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportTypeRepository extends JpaRepository<ReportType, Integer> {
}