package com.stasa.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "members")
@Entity
@Getter
@Setter
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id", nullable = false)
    private MemberRole role;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @Override
    public String toString() {
        return "Member{" +
                "id=" + id +
                ", user=" + user +
                ", role=" + role +
                ", group=" + group +
                '}';
    }
}