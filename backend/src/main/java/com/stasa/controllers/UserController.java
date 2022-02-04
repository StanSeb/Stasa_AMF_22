package com.stasa.controllers;

import com.stasa.entities.User;
import com.stasa.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
  /*
      C - @PostMapping
      R - @GetMapping
      U - @PutMapping
      D - @DeleteMapping
   */

    @Autowired
    private UserService userService;

    private String getSiteURL(HttpServletRequest request){

        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(),"");
    }

    @GetMapping("/verify/{code}")
    public String verifyUser(@PathVariable String code){
        if (userService.verify(code)){
            return "verify_success";

        }else {
            return "verify_fail";
        }
    }

    @GetMapping("/rest/users")
    public List<User> getAll() {
        return userService.getAll();
    }

    @GetMapping("/rest/users/{id}")
    public User getById(@PathVariable long id) {
        return userService.findById(id);
    }

    @GetMapping("/rest/username/{username}")
    public String getByUserName(@PathVariable String username) { return userService.findByUserName(username); }

    @GetMapping("/rest/validateEmail/{email}")
    public boolean getByEmail(@PathVariable String email) { ;return userService.findByEmail(email); }

    @DeleteMapping("/rest/users/{id}")
    public void deleteById(@PathVariable long id) { userService.deleteById(id); }

    @PutMapping("/rest/users/{id}")
    public void updateById(@RequestBody User user, @PathVariable long id) { userService.updateById(id, user); }

    @PostMapping("/rest/process_register")
    public String processRegister(@RequestBody User user, HttpServletRequest request)
    throws UnsupportedEncodingException, MessagingException {
        userService.register(user, getSiteURL(request));
        return "register_success";
    }

    @GetMapping("/rest/whoami")
    public User whoAmI() {
        System.out.println(userService.whoAmI());
        return userService.whoAmI(); }
    
    @PutMapping("/auth/terminateUser/{userId}")
    public String terminateUser(@PathVariable long userId){
        return userService.terminateUser(userId);
    }
}