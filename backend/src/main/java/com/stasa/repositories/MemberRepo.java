package com.stasa.repositories;

import com.stasa.entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepo extends JpaRepository<Member, Long> {


    List<Member> getByUserId(int userId);
}
