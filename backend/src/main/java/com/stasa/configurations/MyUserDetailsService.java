package com.stasa.configurations;

import com.stasa.entities.User;
import com.stasa.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@CrossOrigin(origins="http://localhost:3000")
public class MyUserDetailsService implements UserDetailsService {

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public BCryptPasswordEncoder getEncoder() { return encoder; }

    @Autowired
    private UserRepo userRepo;

//  Springs way of calling the constructor
//  @PostConstruct
//  private void createDefaultUsers(){
//    if (userRepo.findByUsername("user") == null) {
//      addUser("user", "password");
//    }
//  }

    @Override
    public UserDetails loadUserByUsername(String email){
        User user = userRepo.findByEmail(email);
        if(user == null){
            throw new UsernameNotFoundException("User not found by email:"+ email);
        }
        return toUserDetails(user);
    }

    public User addUser(User user){
        //encrypt password before saving
        System.out.println(user);
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return userRepo.save(user); // skickar till db direkt.
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public User updateUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setDeletionTimestamp("2021-09-29");
        try {
            return userRepo.save(user);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    private UserDetails toUserDetails(User user) {
        // If you have a User entity you have to
        // use the userdetails User for this to work
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .roles("USER").build();
    }
}