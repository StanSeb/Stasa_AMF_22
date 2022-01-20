package com.stasa.controller;

import com.stasa.models.Comment;
import com.stasa.models.Thread;
import com.stasa.service.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("threads")
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @GetMapping("getforuser")
    @ResponseBody
    public ResponseEntity<List<Thread>> getThreadsForUser(@RequestParam String userId) {
        return threadService.getUserThreads(userId);
    }

    @PostMapping("newthread")
    public String createThread(@RequestBody Thread thread) throws ExecutionException,
            InterruptedException {
        System.out.println(thread);
        return threadService.postNewThread(thread);
    }
}