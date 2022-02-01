package com.stasa.services;

import com.stasa.repositories.ThreadRepo;
import com.stasa.entities.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Thread> findByGroupId(long id){
        if(threadRepo.findByGroupId(id) != null){
            return threadRepo.findByGroupId(id);
        }
        return null;
    }

    public String postNewThread(Thread thread){
        System.out.println(thread + " from service");
        threadRepo.save(thread);
        return "Post OK";
    }

    public String editThread(Thread thread) {
        if(threadRepo.findThreadById(thread.getId()) != null){
            threadRepo.save(thread);
            return "Saved OK";
        }

        return "Could not find the thread";
    }
}
