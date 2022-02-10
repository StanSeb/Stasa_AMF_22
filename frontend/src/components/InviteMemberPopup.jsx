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

    function handleClick() {

    }

    async function sendInvite() {
        if (props.loggedInUser) {
            // om man är inloggad som en användare körs detta
            await axios.get("/rest/username/" + getUserName)
                .then((response) => {
                    if (response.data !== '') {
                        //TODO: kolla om användaren redan har en invite
                        axios.get("/rest/isInvited/" + props.groupId + "/" + response.data.id)
                            .then((res) => {

                                //true
                                if (res.data) {
                                    alert("Användaren är redan inbjuden.")
                                }
                                // false
                                else {
                                    const inviteObj = {
                                        fromMemberId: props.memberId,
                                        toUserId: response.data.id,
                                        groupId: props.groupId
                                    }

                                    if (response.data.id !== "") {
                                        axios.post("/rest/invite", inviteObj)
                                            .then((response) => {
                                                console.log(response.data)
                                            })
                                        setUserId(response.data.id)
                                    }
                                }
                            })
                    } else {
                        alert("Användaren finns inte.")
                    }
                });
        }
        else {
            alert("Du måste vara inloggad för att kunna skicka inbjudningar.")
        }
    }

    return (

        <div className="invitation-container">
            <button className='btnRemovePopup' onClick={props.toggleProps}>X</button>

            <div className='sendInvite'>
                <h3>Ange användarnam att skicka inbjudan till.</h3>
                <input type="text" value={getUserName} onChange={(e) => setUserName(e.target.value)}
                    placeholder='Ange användarnamn'></input>
                <button onClick={() => sendInvite()}>Skicka inbjudan</button>
                <div>
                    {getUserId ? <label>Injudan har skickats</label> : null}
                </div>
            </div>

        </div>

    )
}

export default InviteMemberPopup