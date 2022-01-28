import React from 'react';
import {useNavigate} from 'react-router-dom'


function Navbar() {

    let navigate = useNavigate();

  return <div>
      <div onClick={()=> {
            navigate("/");
        }}>Home</div>

        <div onClick={()=> {
            navigate("/profile");
        }}>Profile</div>

        <div onClick={()=> {
            navigate("/register");
        }}>Register</div>
        <div onClick={()=> {
            navigate("/login");
        }}>Login</div>
        
        

  </div>;
}

export default Navbar;
