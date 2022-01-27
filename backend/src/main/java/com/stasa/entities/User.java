package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Table(name = "users")
@Entity
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "user_name", nullable = false, length = 50)
    private String username;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "password", nullable = false, length = 80)
    private String password;
    @Column(name="verification_code",nullable=false,length=50)
    private String verificationCode;

    @Column(name = "enabled", nullable = false)
    private boolean enabled = false;

    @Column(name = "deletion_timestamp")
    private String deletionTimestamp;

    @Column(name = "verified", nullable = false)
    private boolean verified = false;

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonProperty
    public String getUsername() {
        return "DeletedUser";
    }

    @JsonProperty
    public void setUsername(String username) {
        this.username = username;
    }
}