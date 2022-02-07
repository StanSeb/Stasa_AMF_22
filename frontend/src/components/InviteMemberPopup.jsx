import axios from 'axios';
import React, { useState } from 'react';

function InviteMemberPopup(props) {

    console.log(props)

    const groupAdminId = props.groupAdmin.id;
    const [getUserName, setUserName] = useState("");
    const [getUserId, setUserId] = useState("");
    const inviteObj = {
        from_member_id: groupAdminId,
        to_user_id: getUserId,
        group_id: props.groupId
    }

    async function checkUserExists() {
        await axios
            .get("/rest/username/" + getUserName)
            .then((response) => {
                if(response.data !== ''){
                    setUserId(response.data.id);
                } else {
                    alert("Användaren finns inte.")
                }           
            })
            .then(
                axios.post("/rest/invite/" + inviteObj)
                .then((response) => {
                    console.log(response)
                })
            )            
    }

    return (
        <div className="popup-container">
            <h1>Mitt id: {groupAdminId}</h1>
            <h1>Grupp ID: {props.groupId}</h1>
            <h3>Användarnamn</h3>
            <input type="text" value={getUserName} onChange={(e) => setUserName(e.target.value)}
                placeholder='Ange användarnamn'></input>
            <button onClick={() => checkUserExists()}>Skicka inbjudan</button>
        </div>
    )
}

export default InviteMemberPopup