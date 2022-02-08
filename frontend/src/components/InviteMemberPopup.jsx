import axios from 'axios';
import React, { useState } from 'react';

function InviteMemberPopup(props) {

    const [getUserName, setUserName] = useState("");
    const [getUserId, setUserId] = useState("");
 

    /* async function checkUserExists() {
        axios.get("/rest/username/" + getUserName)
            .then((response) => {
                if(response.data !== ''){
                    setUserId(response.data.id);
                } else {
                    alert("Användaren finns inte.")
                }           
            });         
    } */

    async function sendInvite() {
        await axios.get("/rest/username/" + getUserName)
            .then((response) => {
                if(response.data !== ''){
              
                    const inviteObj = {
                        id: "",
                        fromMemberId: props.memberId,
                        toUserId: response.data.id,
                        groupId: props.groupId
                    }

                    if(response.data.id !== "") {
                        axios.post("/rest/invite", inviteObj)
                        .then((response) => {
                            console.log(response.data)
                        })
                        setUserId(response.data.id)
                    }
                } else {
                    alert("Användaren finns inte.")
                }           
            });
    }

    return (
        <div className="popup-container">
            <h3>Ange användarnam att skicka inbjudan till.</h3>
            <input type="text" value={getUserName} onChange={(e) => setUserName(e.target.value)}
                placeholder='Ange användarnamn'></input>
            <button onClick={() => sendInvite()}>Skicka inbjudan</button>
            <div>
                {getUserId ? <label>Injudan har skickats</label> : null}
            </div>
            
        </div>
    )
}

export default InviteMemberPopup