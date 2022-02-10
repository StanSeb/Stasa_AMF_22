package com.stasa.services;

import com.stasa.entities.Comment;
import com.stasa.repositories.CommentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    @Autowired
    public CommentRepo commentRepo;

    public Comment getCommentById(long id) {
        return commentRepo.findCommentById(id);
    }

    /**
     * @return If the comment was deleted
     */
    public boolean deleteById(long id) {
        commentRepo.deleteById(id);
        return commentRepo.findCommentById(id) == null;
    }
}
