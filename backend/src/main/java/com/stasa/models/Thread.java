package com.stasa.models;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.firebase.database.PropertyName;
import lombok.Data;

import java.io.Serializable;

@Data
public class Thread implements Serializable {
    private static final long serialVersionUID = 8623130222801655476L;

    @DocumentId
    public String id;
    @PropertyName("group_id")
    public String group_id;
    public String user_id;

    public String content;
    public String title;
}
