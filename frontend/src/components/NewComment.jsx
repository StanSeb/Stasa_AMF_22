import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function NewComment(props) {

    const [getComment, setComment] = useState("");

    function postComment(value, loggedInUser) {

        // Hämtar inloggade användaren med context i render() istället för props för props var broken.

        if(value.length>1){

            const commentObj = { content: value, creatorId: loggedInUser.id, threadId: props.threadId }
            console.log("Comment object: ", commentObj);
            
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
        <AuthContext.Consumer>{context => {
            const loggedInUser = context.loggedInUser;
            if(context.loggedInUser === null) {
                // Don't show new comment box if user is not logged in.
                return null;
            }

            return (
                <div className="comment-newComment" >
                    <textarea value={getComment} onChange={(e) => setComment(e.target.value)}>
                    </textarea>
                    <button onClick={() => postComment(getComment, loggedInUser)}>Skicka</button>
                    <button onClick={() => cancelComment()}>Avbryt</button>
                </div>
            );
        }}
        </AuthContext.Consumer>
    )
}
export default NewComment
