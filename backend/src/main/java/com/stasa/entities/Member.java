package com.stasa.entities;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data

@Table(name="members", schema="stasa", catalog="stasa")
public class Member {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "NATIVE")
    @GenericGenerator(name = "NATIVE", strategy = "native")
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private MemberRoles memberRoles;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;
}
