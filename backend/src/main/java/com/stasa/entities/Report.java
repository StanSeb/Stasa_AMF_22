package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Entity
@Table(name = "reports")
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

    @ManyToOne(optional = false)
    @JoinColumn(name = "target_type", nullable = false)
    private ReportType targetType;

    @Column(name = "target_id", nullable = false)
    private Integer targetId;

    @Column(name = "description", nullable = false, length = 500)
    private String description;

    @Column(name = "creation_timestamp")
    @Generated(GenerationTime.INSERT) // Behövs för att få med det när värdet ändras
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

    // todo: returnera timestamp med rätt tidsformat (GMT)
}