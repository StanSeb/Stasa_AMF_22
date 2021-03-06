package com.stasa.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Base64;
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
    @Column(name = "id")
    private long id;

    @Column(name = "username",  length = 50)
    private String username;

    @Column(name = "email",  length = 80)
    private String email;

    @JsonIgnore
    @Column(name = "password",  length = 80)
    private String password;

    @Column(name="verification_code",length=50)
    private String verificationCode;

    @Column(name = "enabled")
    private boolean enabled = false;

    @Column(name = "deletion_timestamp")
    private String deletionTimestamp;

    /* -------------------- ACCESSORS -------------------- */

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
   public String getDecodedEmail(){
       byte[] decodedBytes = Base64.getDecoder().decode(this.email);
       return new String(decodedBytes);
   }

    @JsonProperty
    public void setUsername(String username) {
        this.username = username;
    }
    
   @JsonProperty
    public String getUsername() {
        if(getDeletionTimestamp() != null) {
           return "DeletedUser";
      }
      return username;
   }
}