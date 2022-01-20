package com.stasa.controller;

import com.stasa.auth.models.User;
import com.stasa.service.FBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

// @RestController
public class MyRestController {

    @Autowired
    FBService firebaseService;

    @GetMapping("/users")
    public User getUser(@RequestHeader String name) throws ExecutionException, InterruptedException {
        return firebaseService.getUser(name);
    }
}
