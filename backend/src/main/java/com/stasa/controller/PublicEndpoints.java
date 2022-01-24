package com.stasa.controller;

import com.stasa.auth.models.User;
import com.stasa.models.Users;
import com.stasa.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/public")
public class PublicEndpoints {
    @Autowired
    private UserService userService;

    @GetMapping("test")
    ResponseEntity<String> getPublic() {
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody Users user) throws ExecutionException, InterruptedException {
        userService.registerUser(user);
    }
}
