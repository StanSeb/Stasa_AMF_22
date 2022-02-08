package com.stasa;

import com.stasa.controllers.MemberController;
import com.stasa.entities.Group;
import com.stasa.services.GroupService;
import com.stasa.services.MemberService;
import com.stasa.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class StasaProjectApplicationTests {

	@Autowired
	UserService userService;

	@Autowired
	GroupService groupService;

	@Autowired
	MemberService memberService;

	@Autowired
	MemberController memberController;

	@Test
	void contextLoads() {
	}

	/*@Test
	public void testGetByUsername() throws IOException {
		String username = "Sebbe";
		Map<Long, String> byUserName = userService.findByUserName(username);

		assertEquals("Sebbe", byUserName.get("username"));
	}
	 */

	@Test
	public void testGetEmail() {
		String email = "stanczak.sebastian@gmail.com";
		boolean foundEmail = userService.findByEmail(email);

		assertTrue(foundEmail);
	}

	@Test
	public void testCreateGroup() {
		String group1Title = "Robin är bäst";
		String group1Desc = "Philip är också bäst";

		Group group1 = new Group();
		group1.setTitle(group1Title);
		group1.setDescription(group1Desc);
		group1.setUserId(40);

		String responseGroup1 = groupService.addGroup(group1);
		assertEquals("successful", responseGroup1);
	}

	@Test
	public void testCreateSameGroupName() {
		String group1Title = "Robin är bäst";
		String group1Desc = "Philip är också bäst";
		String group2Title = "Robin är bäst";
		String group2Desc = "Philip är också bäst";

		Group group1 = new Group();
		group1.setTitle(group1Title);
		group1.setDescription(group1Desc);
		group1.setUserId(40);

		Group group2 = new Group();
		group2.setTitle(group2Title);
		group2.setDescription(group2Desc);
		group2.setUserId(41);

		String responseGroup1 = groupService.addGroup(group1);
		String responseGroup2 = groupService.addGroup(group2);

		assertEquals("successful", responseGroup1);
		assertEquals("failed", responseGroup2);
	}

	@Test
	public void testGetMember(){
		ArrayList<Map> memberIdByUserId = memberService.getMemberIdByUserId(46L, 16L);

	}

}