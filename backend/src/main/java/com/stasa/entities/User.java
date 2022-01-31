package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.stasa.util.ApiConstants;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

import static com.stasa.util.ApiConstants.DELETION_REQUIRED_REPORTS;

@Table(name = "users")
@Entity
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "user_name", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 80)
    private String password;
    @Column(name="verification_code",length=50)
    private String verificationCode;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = false;

    @Column(name = "deletion_timestamp")
    private Instant deletionTimestamp;

    @OneToMany(mappedBy = "targetUser")
    @JsonIgnoreProperties("targetUser")
    @JsonIgnore
    public List<Report> reports;

    /* -------------------- ACCESSORS -------------------- */

    @JsonProperty
    public boolean canBeDeleted() {
        return reports.size() >= DELETION_REQUIRED_REPORTS;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

}