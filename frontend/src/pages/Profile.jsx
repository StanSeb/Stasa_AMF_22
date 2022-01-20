import { render } from '@testing-library/react';
import React, { Component } from 'react';
import {useNavigate} from 'react-router-dom'


export default function Profile() {
    let navigate = useNavigate();

    
    return <div>
        <div> Welcome to profile </div> 
        <button onClick={()=> {
            navigate("/createGroup");
        }}>Create a group</button>  
        </div>;
  
}

