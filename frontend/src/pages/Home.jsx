import React from 'react';
import {useNavigate} from "react-router-dom";

function Home() {

    // hämtar ut browseId
   // const { id } = props.match.params
   const navigate=useNavigate();

    return (
        <div>
            <h1>Home page</h1>
            <p>use this to go to register</p>
             <button onClick={()=>navigate("/register")}> Register </button>
        </div>
    )
}

export default Home