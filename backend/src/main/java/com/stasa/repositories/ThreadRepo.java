package com.stasa.repositories;

import com.stasa.entities.Comment;
import com.stasa.entities.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends JpaRepository<Thread, Long> {

    @Query(value = "SELECT * FROM threads WHERE threads.deletion_timestamp IS NULL AND threads" +
            ".group_id = ?", nativeQuery = true)
    List<Thread> findByGroupId(Long id);

    @Query(value = "SELECT * from threads where id =?", nativeQuery = true)
    Thread findThreadById(Long id);


}