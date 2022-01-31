package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "reports", indexes = {
        @Index(name = "FK_USER_TARGET", columnList = "target_user_id")
})
@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "target_user_id", nullable = false)
    private User targetUser;

    /** Retrieved using whoAmI */
    @ManyToOne(optional = false)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @Column(name = "description", length = 500)
    private String description;

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "creation_timestamp")
    private Instant creationTimestamp;

    @JsonProperty
    public User getReporter() {
        return reporter;
    }

    /** The reporter is set using whoAmI */
    @JsonIgnore
    public void setReporter(User reporter) {
        this.reporter = reporter;
    }
}