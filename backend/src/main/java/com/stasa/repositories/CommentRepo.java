package com.stasa.repositories;

import com.stasa.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {


    @Query(value="SELECT * FROM comments WHERE comments.id =?1",nativeQuery = true)
    Comment findCommentById(long id);

    @Query(value="UPDATE comments SET comments.delition_timestamp=?1\n" +
            "WHERE comments.id=?2",nativeQuery = true)
    void deleteComment(Comment newComment,long id);

    @Query(value="SELECT comments.id, comments.content, comments.creator_id, " +
            "users.username " +
            " FROM comments\n" +
            "INNER JOIN users\n" +
            "ON users.id = comments.creator_id\n" +
            "WHERE comments.delition_timestamp IS NULL AND comments.thread_id =?1", nativeQuery = true)
    List<Object> findCommentsById(long id);

    @Query(value="INSERT INTO comments (content,creator_id,thread_id) VALUES(?1,?2,?3)",nativeQuery = true)
    void postNewComment(String comment, long creatorId, long threadId);
}