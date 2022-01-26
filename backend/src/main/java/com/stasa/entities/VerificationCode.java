package com.stasa.entities;

import lombok.*;
import javax.persistence.*;

@Table(name = "verification_codes", indexes = {
        @Index(name = "code_user_id", columnList = "code, user_id", unique = true)
})
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class VerificationCode {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "code", nullable = false, length = 50)
    private String code;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public VerificationCode(String code, User user) {

    }
}