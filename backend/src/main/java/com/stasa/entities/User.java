package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.Instant;

@Table(name = "users", indexes = {
        @Index(name = "user_name", columnList = "user_name", unique = true),
        @Index(name = "email", columnList = "email", unique = true)
})
@Entity
@Getter
@Setter
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "user_name",  length = 50)
    private String username;

    @Column(name = "email",  length = 50)
    private String email;

    @Column(name = "password",  length = 80)
    private String password;

    @Column(name="verification_code",length=50)
    private String verificationCode;

    @Column(name = "enabled")
    private boolean enabled = false;

    @Column(name = "deletion_timestamp")
    private String deletionTimestamp;

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
//
//    @JsonProperty
//    public String getUsername() {
//        return "DeletedUser";
//    }

    @JsonProperty
    public void setUsername(String username) {
        this.username = username;
    }
    @JsonProperty
    public boolean isEnabled() {
        return enabled;
    }

    // Gör så att man inte kan sätta enabled manuellt i en request från client.
    @JsonIgnore
    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}