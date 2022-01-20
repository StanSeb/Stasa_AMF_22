package com.stasa;

import com.stasa.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StasaProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(StasaProjectApplication.class, args);
		// UserService userService = new UserService();
		// System.out.println(userService.getUserCollection());
	}
}