package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

/* report, target-type och target-id är unika tillsammans. Alla de tre kan inte vara samma.
* Detta är för att förhindra att en användare rapporterar samma entitet flera gånger. */

@Table(name = "reports")
@Entity
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "target_type", nullable = false)
    private ReportType targetType;

    @Column(name = "target_id", nullable = false)
    private Integer targetId;

    @Column(name = "description", length = 500, nullable = false)
    private String description;

    @Column(name = "creation_timestamp")
    @GeneratedValue
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