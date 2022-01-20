package com.stasa.models;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.firebase.database.PropertyName;
import lombok.Data;

import java.io.Serializable;

@Data
public class Comment implements Serializable {
    private static final long serialVersionUID = 403426396654933182L;

    @DocumentId
    public String id;
    /** References the User UID */
    @PropertyName("commenter_id")
    public String commenterId;
    @PropertyName("thread_id")
    public String threadId;

    public String content;
}
