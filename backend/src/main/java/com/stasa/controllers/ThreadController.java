package com.stasa.controllers;

import com.stasa.entities.User;
import com.stasa.services.ThreadService;
import com.stasa.entities.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThreadController {
  /*
      C - @PostMapping
      R - @GetMapping
      U - @PutMapping
      D - @DeleteMapping
   */

    @Autowired
    private ThreadService threadService;

    @GetMapping("/rest/thread/{id}")
    public Thread getById(@PathVariable long id) {
        return threadService.findById(id);
    }

    @GetMapping("/rest/thread/{id}")
    public Thread getByGroupId(@PathVariable long id) {
        return threadService.findByGroupId(id);
    }
}
