import axios from 'axios';
import React from 'react';
import { useState } from 'react'

function NewComment(props) {

    const [getComment, setComment] = useState("");

    function postComment(value) {
        if(value.length>1){

            const commentObj = { content: value, creatorId: props.userId, threadId: props.threadId }
            
            axios.post("/rest/threads/newComment", commentObj)
            .then(response => {
                props.fetchComments()
                setComment("")
                props.toggleComment(false)
            })
        }else{
            alert("din kommentar måste vara längre än ett tecken!")
        }

    }

    function cancelComment() {

        props.toggleComment(false)
    }

    return (
            <div className="comment-newComment" >
                <textarea value={getComment} onChange={(e) => setComment(e.target.value)}>
                </textarea>
                <button onClick={() => postComment(getComment)}>Skicka</button>
                <button onClick={() => cancelComment()}>Avbryt</button>
            </div>
    )
}
export default NewComment
