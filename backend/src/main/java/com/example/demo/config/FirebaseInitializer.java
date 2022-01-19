package com.example.demo.config;

import com.example.demo.entity.User;
import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirebaseInitializer{
    @PostConstruct
    public String initialize() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("./serviceAccount.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if(FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }

        return "Init OK";
    }

    public String getUsers() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();

        ApiFuture<QuerySnapshot> query = db.collection("users").get();
        QuerySnapshot querySnapshot = query.get();
        List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
        User user = new User();
        user.setId(documents.get(0).getId());
        user.setUsername(documents.get(0).getString("username"));
        user.setUserGroups(documents.get(0).getString("usergroups"));
        user.setPrivilage(documents.get(0).getString("privilage"));
        return user.toString();
    }

    public Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }
}