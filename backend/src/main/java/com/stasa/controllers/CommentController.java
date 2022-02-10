package com.stasa.controllers;

import com.stasa.entities.Comment;
import com.stasa.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rest/comments/")
public class CommentController {

    @Autowired
    public CommentService commentService;

    @GetMapping("{id}")
    public Comment getCommentById(@PathVariable long id) {
        return commentService.getCommentById(id);
    }

    @DeleteMapping("{id}")
    public boolean deleteCommentById(@PathVariable long id) {
        return commentService.deleteById(id);
    }

}
