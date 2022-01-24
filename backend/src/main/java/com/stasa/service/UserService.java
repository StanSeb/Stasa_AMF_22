package com.stasa.service;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.stasa.models.Users;
import org.springframework.stereotype.Service;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private Firestore db = FirestoreClient.getFirestore();
    private final String COLLECTION_NAME = "users";

    public CollectionReference getUserCollection() {
        return db.collection("users");
    }

    public Users getUserDetails(String id) throws InterruptedException, ExecutionException {
        DocumentReference documentRef = getUserCollection().document(id.toString());
        ApiFuture<DocumentSnapshot> future = documentRef.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            return document.toObject(Users.class);
        }
        else {
            return null;
        }
    }

    // regirerar en användare
    public void registerUser(Users user) throws ExecutionException, InterruptedException {
        // ansluter till firestor
        Firestore fis = FirestoreClient.getFirestore();

        //Hämtar dokument id
        String id = db.collection(COLLECTION_NAME).document().getId();

        // spara ner userObjektet i firestore
        ApiFuture<WriteResult> collectionFuture = fis.collection(COLLECTION_NAME).document(id).set(user);

        // returnera datum.
        collectionFuture.get().getUpdateTime().toString();
    }
}
