package com.example.firestore.config;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.context.annotation.Bean;

public class FirebaseConfig {
    @Bean
    public Firestore getDb() {
        return FirestoreClient.getFirestore();
    }
}
