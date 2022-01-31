package com.stasa.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "member_roles")
@Entity
@Getter
@Setter
public class MemberRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;
}