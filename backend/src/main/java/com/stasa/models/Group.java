package com.stasa.models;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Data;
import java.io.Serializable;

@Data
public class Group implements Serializable {
    private static final long serialVersionUID = -4630796735954508532L;
    @DocumentId
    public String id;
    public String admin;
    public String user;
    public String title;
    public String blacklist;
}
