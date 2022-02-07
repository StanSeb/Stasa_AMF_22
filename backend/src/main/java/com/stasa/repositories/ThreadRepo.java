package com.stasa.repositories;

import com.stasa.entities.Comment;
import com.stasa.entities.Thread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThreadRepo extends JpaRepository<Thread, Long> {
    Thread findById(Integer id);

    @Query(value = "SELECT * FROM threads WHERE threads.deletion_timestamp IS NULL AND threads" +
            ".group_id = ?", nativeQuery = true)
    List<Thread> findByGroupId(Long id);

    @Query(value = "SELECT * from threads where id =?", nativeQuery = true)
    Thread findThreadById(Long id);

        @Query(value="SELECT content, users.username FROM comments\n" +
                "INNER JOIN users\n" +
                "ON users.id = comments.creator_id\n" +
                "WHERE comments.thread_id =?1", nativeQuery = true)
    List<String> findCommentsById(long id);


    @Query(value="INSERT INTO comments (content,creator_id,thread_id) VALUES(?1,?2,?3)",nativeQuery = true)
    void postNewComment(String comment, long creatorId, long threadId);
}