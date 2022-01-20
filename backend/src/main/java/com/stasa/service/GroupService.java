package com.stasa.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.stasa.models.Group;
import com.stasa.models.Thread;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class GroupService {

    private Firestore db = FirestoreClient.getFirestore();

    public ResponseEntity<List<Group>> getUserGroups(String userUID) {

        System.out.println("Getting user groups for user with UID " + userUID);

        var groups = db.collection("groups");
        var query = groups.whereEqualTo("user", userUID);
        var querySnapshot = query.get();

        try {
            var theGroups = querySnapshot.get().getDocuments().stream()
                    .map(document -> document.toObject(Group.class))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(theGroups);
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
