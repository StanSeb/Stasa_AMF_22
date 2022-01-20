package com.stasa.controller;

import com.stasa.models.Comment;
import com.stasa.service.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ThreadController {

    @Autowired
    private ThreadService threadService;



}
