package com.stasa;

import com.stasa.configurations.MyUserDetailsService;
import com.stasa.entities.User;
import org.junit.jupiter.api.Test;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;

public class ServerTest {

    @Test
    public void testJunit() {
        String name1 = "Sebbe";
        assertNotNull(name1);
        assertEquals(name1, "Sebbe");
    }

    @Test
    public void testDecoder(){
        User user = new User();
        String email="Andreas_93l@hotmail.com";
        user.setEmail(Base64.getEncoder().encodeToString(email.getBytes()));
        user.setPassword("larre123456");
        user.setUsername("larre");
        user.setEnabled(true);
        System.out.println(user.getEmail());
    }


    @Test
    public void testAddUser(){
        MyUserDetailsService userDetailsService = new MyUserDetailsService();
        User user = new User();

        String email="Andreas_93l@hotmail.com";
        user.setEmail(Base64.getEncoder().encodeToString(email.getBytes()));
        user.setPassword("larre123456");
        user.setUsername("larre");
        user.setEnabled(true);

        User user1 = userDetailsService.addUser(user);
        System.out.println(user1.getEmail());

    }

    @Test
    public void login(){
        String email1 ="andreas@gmail.com";
        String email2 ="andreas@gmail.com";

        String s1 = Base64.getEncoder().encodeToString(email1.getBytes());
        String s2 = Base64.getEncoder().encodeToString(email2.getBytes());

        assertEquals(s1,s2);


    }
}
