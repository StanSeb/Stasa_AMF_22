package com.stasa.models;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Data;
import java.io.Serializable;

@Data
public class Users implements Serializable {
   public static final long SerialversionUID = 6012005399675296187L;

    @DocumentId
    private String id;
    private String email;
    private String password;
    private String privilage;
    private String usergroups;
    private String username;

}
