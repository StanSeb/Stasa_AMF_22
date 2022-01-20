package com.stasa.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.stasa.models.Thread;
import org.apache.http.client.ResponseHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class ThreadService {

    private Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<List<Thread>> getUserThreads(String userUID) {
        System.out.println("Getting user threads for user with UID " + userUID);

        var threads = db.collection("threads");
        var query = threads.whereEqualTo("user_id", userUID);
        var querySnapshot = query.get();

        try {
            var theThreads = querySnapshot.get().getDocuments().stream()
                    .map(document -> document.toObject(Thread.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(theThreads);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String postNewThread(Thread thread) throws ExecutionException, InterruptedException {
        System.out.println("Posting thread for user with UID " + thread.id);
        ApiFuture<WriteResult> collectionsApiFuture =
                db.collection("threads").document().set(thread);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }
}