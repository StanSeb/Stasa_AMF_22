package com.stasa.entities;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Data
@ToString
@Table(name="comments")
public class Comment {

    @Column(name="id")
    @Id
    private long id;

    @Column(name="content")
    private String content;

    @Column(name="thread_id")
    private long threadId;

    @Column(name="creator_id")
    private long creatorId;

    @Column(name="delition_timestamp")
    private String  delitionTimeStamp;

}
