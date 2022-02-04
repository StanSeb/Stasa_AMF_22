package com.stasa.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "content", nullable = false, length = 50)
    private String content;

    @ManyToOne(optional = false)
    @JoinColumn(name = "thread_id", nullable = false)
    private Thread thread;

    @ManyToOne(optional = false)
    @JoinColumn(name = "creator_id", nullable = false)
    private Member creator;

    @Column(name = "delition_timestamp", length = 50)
    private String delitionTimestamp;
}