import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
import axios from 'axios';

export default function Profile(props) {
   async function terminateUserById() {
        await axios.put("/auth/terminateUser/"+ props.userObj.id)
        .then(response => {
            alert(response.data)
        })
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

        <button onClick={terminateUserById}>Stäng av kontot</button>
        </div>;
  
}

