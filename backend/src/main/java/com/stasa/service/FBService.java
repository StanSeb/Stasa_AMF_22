package com.stasa.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.stasa.auth.models.User;

import java.util.concurrent.ExecutionException;

// @Service
public class FBService {
    private final Firestore db = FirestoreClient.getFirestore();

    public User getUser(String name) throws ExecutionException, InterruptedException {
        var docRef = db.collection("users").document(name);
        var future = docRef.get();

        var document = future.get();

        if(document.exists()) {
            return document.toObject(User.class);
        } else {
            return null;
        }
    }
}
