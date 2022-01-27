package com.stasa.repositories;

import com.stasa.entities.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepo extends JpaRepository<Thread, Long> {
    Thread findById(Integer id);

    Thread findByGroupId(Integer id);
}