import axios from 'axios';
import React, { Component } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function Profile(props) {
   async function terminateUserById() {
        await axios.put("/auth/terminateUser/"+ props.userObj.id)
        .then(response => {
            alert(response.data)
        })
    }
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

        <button onClick={terminateUserById}>Stäng av kontot</button>
        <button onClick={logOut}>Logga ut</button>
        </div>;

  
}



  render() {

    return <div>PROFILE PAGE

<div>{this.state.groups.map((group) =>( 
            <ul key={group.id}> 
             <li> Title: <span>{group.group.title}</span> <br />
                  Description: <span>{group.group.description}</span> <br />
                  Group role: <span>{group.memberRoles.title}</span>

               </li>
            </ul>  
            ))}</div>

    </div>;



}
}
