package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Time;
import java.time.Instant;
import java.util.List;

@Table(name = "threads")
@Entity
@Getter
@Setter
@ToString
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "title", nullable = false, length = 50)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "group_id", length = 80)
    private long groupId;

    @Column(name = "creator_id", length = 80)
    private long creatorId;

    @Column(name = "deletion_timestamp", length = 80)
    private String deletionTimestamp;
}
