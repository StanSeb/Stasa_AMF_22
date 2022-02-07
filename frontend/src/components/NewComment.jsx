import axios from 'axios';
import React from 'react';
import {useState} from 'react'

 function NewComment(props) {
     
    const [getComment,setComment]=useState("");

    function postComment(value){
      const commentObj={content:value,creatorId:props.userId, threadId:props.threadId}

      axios.post("/rest/threads/newComment",commentObj)
      .then(response =>console.log(response.data))
      .then(props.fetchComments())
        

    }
    function cancelComment(){

        props.toggleComment(false)
    }

  return(
  <>
  <div>
      <textarea className="comment-newComment" value={getComment} onChange={(e) => setComment(e.target.value)}>
      </textarea>
    <button className="send-newComment" onClick={()=>postComment(getComment)}>Skicka</button>
    <button className="cancel-newComment" onClick={()=>cancelComment()}>Avbryt</button>
  </div>
  </>
  )
}
export default NewComment
