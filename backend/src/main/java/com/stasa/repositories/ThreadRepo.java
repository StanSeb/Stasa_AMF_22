package com.stasa.repositories;

import com.stasa.entities.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends JpaRepository<Thread, Long> {
    Thread findById(Integer id);

    List<Thread> findByGroupId(Long id);
}