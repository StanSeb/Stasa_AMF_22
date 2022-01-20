package com.stasa.controller;

import com.stasa.auth.models.User;
import com.stasa.models.Comment;
import com.stasa.models.Thread;
import com.stasa.service.CommentsService;
import com.stasa.service.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("private")
public class PrivateEndpoint {

    @Autowired
    private CommentsService commentsService;

    @Autowired
    private ThreadService threadService;


    @GetMapping("user-details")
    public ResponseEntity<User> getUserInfo(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(user);
    }

    @GetMapping("my-comments")
    public ResponseEntity<List<Comment>> getComments() {
        return commentsService.getMyComments();
    }

    @GetMapping("threads")
    @ResponseBody
    public ResponseEntity<List<Thread>> getThreadsForUser(@RequestParam String userId) {
        return threadService.getUserThreads(userId);
    }



}
