package com.stasa.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * This class is only for reference.
 */

// @Service
@Deprecated
public class FBInit {

    // @PostConstruct
    public void init() {
        FileInputStream serviceAccount = null;

        try {
            serviceAccount = new FileInputStream("serviceAccount.json");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return;
        }

        try {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://stasa-da3d5.firebaseio.com")
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            System.out.println("Firebase is initialized.");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
