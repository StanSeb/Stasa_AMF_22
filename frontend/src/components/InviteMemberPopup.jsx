import axios from 'axios';
import React, { useState } from 'react';

function InviteMemberPopup(props) {

    const [getUserName, setUserName] = useState("");
    const [getUserId, setUserId] = useState("");
    const inviteObj = {
        id: "",
        fromMemberId: props.groupId,
        toUserId: getUserId,
        groupId: props.groupId
    }

    async function checkUserExists() {
        axios.get("/rest/username/" + getUserName)
            .then((response) => {
                if(response.data !== ''){
                    setUserId(response.data.id);
                } else {
                    alert("Användaren finns inte.")
                }           
            });         
    }

    function sendInvite() {
        console.log(getUserId)
        checkUserExists();
        if(getUserId !== "") {
            axios.post("/rest/invite", inviteObj)
            .then((response) => {
                console.log(response)
            })
        }
    }

    return (
        <div className="popup-container">
            <h3>Användarnamn</h3>
            <input type="text" value={getUserName} onChange={(e) => setUserName(e.target.value)}
                placeholder='Ange användarnamn'></input>
            <button onClick={() => sendInvite()}>Skicka inbjudan</button>
        </div>
    )
}

export default InviteMemberPopup