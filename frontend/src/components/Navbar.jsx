import React from 'react';
import {useNavigate} from 'react-router-dom'


function Navbar() {

    let navigate = useNavigate();

  return <div>
      <div onClick={()=> {
            navigate("/homepage");
        }}>Homepage</div>

        <div onClick={()=> {
            navigate("/profile");
        }}>Profile</div>
        
        

  </div>;
}

export default Navbar;
