package com.stasa.services;

import com.stasa.entities.Comment;
import com.stasa.repositories.CommentRepo;
import com.stasa.repositories.ThreadRepo;
import com.stasa.entities.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ThreadService {
    @Autowired
    private ThreadRepo threadRepo;
    @Autowired
    private CommentRepo commentRepo;

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
    public String deleteComment(long id) {
        if(commentRepo.findCommentById(id) != null){
            Comment newComment = commentRepo.findCommentById(id);
            Date date = Calendar.getInstance().getTime();
            DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
            String strDate = dateFormat.format(date);
            newComment.setDelitionTimeStamp(strDate);
            commentRepo.save(newComment);
            return "Delete OK";
        }else{
            return "Could not find comment in database";
        }
    }

    public List<Object> findCommentById(long id) {
       return commentRepo.findCommentsById(id);
    }

    public String postNewComment(Comment comment) {
         commentRepo.postNewComment(comment.getContent(), comment.getCreatorId(), comment.getThreadId());
         return "threadService worked";
    }

    public String editComment(Comment comment) {
        if(commentRepo.findCommentById(comment.getId()) != null){
            Comment newComment = commentRepo.findCommentById(comment.getId());
            newComment.setContent(comment.getContent());
            commentRepo.save(newComment);
            return "Saved OK";
        }
            return "Could not find comment!";
    }
}
