import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import {Router, useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

export default function Profile(props) {

  

    async function logOut() {
        await fetch("/logout", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors',
        })
        navigate("/")
        window.location.reload(true)
    }

    let navigate = useNavigate();

    return <div className='profileContainer'>
        <div> Welcome to profile </div> 
        <button onClick={()=> {
            navigate("/createGroup");
        }}>Create a group</button>  
        <button onClick={()=> {
            navigate("/getGroups");
        }}>Get groups</button> 

        
        {checkIfSignedId(props.userObj.id)}
        <button onClick={logOut}>Logga ut</button>
        </div>;
}

function checkIfAdmin(id){
   if (typeof(id) != "undefined") {
        axios.get("/rest/isAdmin/"+id)
        .then(response => {
            return response.data;
        })
   }
 
    return false;
}

function checkIfSignedId(id) {
    const profileID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

    if (id == profileID || checkIfAdmin(id)){
        function terminateUserById(id) {
            axios.put("/auth/terminateUser/"+ id)
            .then(response => {
                alert(response.data)
            }).catch((error) =>{
                console.log(error)
            })
        }
        return <button onClick={terminateUserById}>Stäng av kontot</button>;
    }
     return <></>;
}