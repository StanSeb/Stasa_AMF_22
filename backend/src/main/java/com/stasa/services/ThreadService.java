package com.stasa.services;

import com.stasa.entities.Comment;
import com.stasa.repositories.ThreadRepo;
import com.stasa.entities.Thread;
import org.apache.tomcat.jni.Time;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
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
            Thread newThread = threadRepo.findThreadById(thread.getId());
            newThread.setContent(thread.getContent());
            newThread.setTitle(thread.getTitle());
            threadRepo.save(newThread);
            return "Saved OK";
        }

        return "Could not find the thread";
    }

    public String deleteThread(long id) {
        if(threadRepo.findThreadById(id) != null){
            Thread newThread = threadRepo.findThreadById(id);
            Date date = Calendar.getInstance().getTime();
            DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
            String strDate = dateFormat.format(date);
            newThread.setDeletionTimestamp(strDate);
            threadRepo.save(newThread);
            return "Delete OK";
        }else{
            return "Could not find thread in database";
        }
    }

    public List<String> findCommentById(long id) {

       return threadRepo.findCommentsById(id);
    }

    public String postNewComment(Comment comment) {
         threadRepo.postNewComment(comment.getContent(), comment.getCreatorId(), comment.getThreadId());
         return "threadService worked";
    }
}
