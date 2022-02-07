package com.stasa.entities;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Data
@Table(name="invitations", schema="stasa", catalog="stasa")
public class Invitation {
    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "NATIVE")
    @GenericGenerator(name = "NATIVE", strategy = "native")
    private long id;

    @Column(name = "from_member_id")
    private long fromMemberId;

    @Column(name = "to_user_id")
    private long toUserId;

    @Column(name ="group_id")
    private long groupId;
}
