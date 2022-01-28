import React, { useState } from 'react'
import Axios from 'axios';

function Login() {
    
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");


    // POST request using fetch with async/await
   async function loginUser() {

            
        const newUserObject = { email: getEmail, password: getPassword };
        if(newUserObject.email===''||newUserObject.password===''){
            alert('you need to fill in the entire form!')
        }
        else{

            await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                mode: "no-cors",
                body: newUserObject,
              });
            }
    
          
   }

    

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser();
    }

    return (
        <div id="login-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login</label>
                </div>
                <div className='stuff-container'>

                <input type="text" value={getEmail} onChange={(e) => setEmail(e.target.value)}
                    id="email-input" placeholder='E-mail'></input>
                    </div>

                <div className='stuff-container'>
                    <input type="password" value={getPassword} onChange={(e) => setPassword(e.target.value)}
                        id="password-input" placeholder='Password'></input>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login