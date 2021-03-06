package com.stasa.controllers;

import com.stasa.entities.Comment;
import com.stasa.services.ThreadService;
import com.stasa.entities.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/rest/threads/")
public class ThreadController {
  /*
      C - @PostMapping
      R - @GetMapping
      U - @PutMapping
      D - @DeleteMapping
   */

    @Autowired
    private ThreadService threadService;

    @GetMapping("byId/{id}")
    public Thread getById(@PathVariable long id) {
        return threadService.findById(id);
    }

    @GetMapping("byGroup/{id}")
    public List<Thread> getByGroupId(@PathVariable long id) {
        return threadService.findByGroupId(id);
    }

    @PostMapping("newThread")
    public String postNewThread(@RequestBody Thread thread){
        return threadService.postNewThread(thread);
    }
    @PostMapping("newComment")
    public String newComment(@RequestBody Comment comment ){
        return threadService.postNewComment(comment);
    }

    @PutMapping("editThread")
    public String editThread(@RequestBody Thread thread){
        return threadService.editThread(thread);
    }

    @PutMapping("deleteThread/{id}")
    public String deleteThread(@PathVariable long id){
        return threadService.deleteThread(id);
    }

    @PutMapping("deleteComment/{id}")
    public String deleteComment(@PathVariable long id){
        return threadService.deleteComment(id);
    }

    @GetMapping("commentsForThread/{id}")
    public List<Object> comments(@PathVariable long id){
        return threadService.findCommentById(id);
    }

    @PutMapping("editComment")
    public String editComment(@RequestBody Comment comment){

        return threadService.editComment(comment);
    }
}
