package com.example.demo.service;

import com.example.demo.entity.User;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;

import java.util.concurrent.ExecutionException;

public class UserService {
    private Firestore firestore;

    public CollectionReference getUserCollection() {
        return firestore.collection("users");
    }

    public User getUserDetails(String id) throws InterruptedException, ExecutionException {
        DocumentReference documentRef = getUserCollection().document(id.toString());
        ApiFuture<DocumentSnapshot> future = documentRef.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            return document.toObject(User.class);
        }
        else {
            return null;
        }
    }
}
