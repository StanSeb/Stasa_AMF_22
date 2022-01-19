package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.config.FirebaseInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    @Autowired
    private FirebaseInitializer db;

    public String getUserCollection() {
        try{
            ApiFuture<QuerySnapshot> query = db.getFirestore().collection("users").get();
            QuerySnapshot querySnapshot = query.get();
            List<QueryDocumentSnapshot> documents = querySnapshot.getDocuments();
            User user = new User();
            user.setId(documents.get(0).getId());
            user.setUsername(documents.get(0).getString("username"));
            user.setUserGroups(documents.get(0).getString("usergroups"));
            user.setPrivilage(documents.get(0).getString("prilivage"));
            return user.toString();
        }
        catch (ExecutionException e){

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return "Haa";
    }
}
