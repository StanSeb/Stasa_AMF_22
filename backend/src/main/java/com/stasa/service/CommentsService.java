package com.stasa.service;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.stasa.models.Comment;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsService {

    private Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<List<Comment>> getMyComments() {
        return null;
    }

    public ResponseEntity<Comment> createNewComment(String content, String threadId) {
        return null;
    }

}
