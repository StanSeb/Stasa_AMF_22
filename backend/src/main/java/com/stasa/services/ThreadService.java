package com.stasa.services;

import com.stasa.repositories.ThreadRepo;
import com.stasa.entities.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ThreadService {
    @Autowired
    private ThreadRepo threadRepo;

    public Thread findById(long id){
        if(threadRepo.findById(id).isPresent()){
            return threadRepo.findById(id).get();
        }
        return null;
    }

    public Thread findByGroupId(long id){
        if(threadRepo.findByGroupId(id).isPresent()){
            return threadRepo.findByGroupId(id).get();
        }
        return null;
    }
}
