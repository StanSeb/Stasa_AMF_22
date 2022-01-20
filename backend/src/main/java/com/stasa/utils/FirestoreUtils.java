package com.stasa.utils;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

public class FirestoreUtils {

    public static final Firestore firestore = FirestoreClient.getFirestore();

}
