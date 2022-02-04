package com.stasa;

import com.stasa.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class StasaProjectApplicationTests {

	@Autowired
	UserService userService;

	@Test
	void contextLoads() {
	}

	@Test
	public void testGetByUsername() throws IOException {
		String username = "Sebbe";
		String byUserName = userService.findByUserName(username);

		assertEquals("Sebbe", byUserName);
	}

	@Test
	public void testGetEmail() {
		String email = "stanczak.sebastian@gmail.com";
		boolean foundEmail = userService.findByEmail(email);

		assertTrue(foundEmail);
	}
}
