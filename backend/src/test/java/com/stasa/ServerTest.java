package com.stasa;

import com.stasa.configurations.MyUserDetailsService;
import com.stasa.entities.User;
import com.stasa.services.GroupService;
import com.stasa.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ServerTest {

    @Autowired
    UserService userService;

    @Autowired
    GroupService groupService;

    @Test
    public void testJunit() {
        String name1 = "Sebbe";
        assertNotNull(name1);
        assertEquals(name1, "Sebbe");
    }

    @Test
    public void testDecoder() {
        User user = new User();
        String email = "Andreas_93l@hotmail.com";
        user.setEmail(Base64.getEncoder().encodeToString(email.getBytes()));
        user.setPassword("larre123456");
        user.setUsername("larre");
        user.setEnabled(true);

        assertEquals("Andreas_931@hotmail.com", user.getEmail());
    }


    @Test
    public void testAddUser() {
        MyUserDetailsService userDetailsService = new MyUserDetailsService();
        User user = new User();

        String email = "Andreas_93l@hotmail.com";
        user.setEmail(Base64.getEncoder().encodeToString(email.getBytes()));
        user.setPassword("larre123456");
        user.setUsername("larre");
        user.setEnabled(true);

        User user1 = userDetailsService.addUser(user);
        System.out.println(user1.getEmail());
    }

    @Test
    public void login() {
        String email1 = "andreas@gmail.com";
        String email2 = "andreas@gmail.com";

        String s1 = Base64.getEncoder().encodeToString(email1.getBytes());
        String s2 = Base64.getEncoder().encodeToString(email2.getBytes());

        assertEquals(s1, s2);
    }

}
