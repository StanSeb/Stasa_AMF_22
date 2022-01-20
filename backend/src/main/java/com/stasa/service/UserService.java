package com.stasa.service;

import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.stasa.auth.models.User;

import java.util.concurrent.ExecutionException;

public class UserService {
    private Firestore db = FirestoreClient.getFirestore();

    public CollectionReference getUserCollection() {
        return db.collection("users");
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
