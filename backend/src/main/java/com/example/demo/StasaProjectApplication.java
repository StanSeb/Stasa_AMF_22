package com.example.demo;

import com.example.demo.config.FirebaseInitializer;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.util.concurrent.ExecutionException;

@SpringBootApplication
public class StasaProjectApplication {

	public static void main(String[] args) throws IOException, ExecutionException, InterruptedException {
		SpringApplication.run(StasaProjectApplication.class, args);

		FirebaseInitializer initializer = new FirebaseInitializer();
		initializer.initialize();
		System.out.println(initializer.getUsers());
	}
}