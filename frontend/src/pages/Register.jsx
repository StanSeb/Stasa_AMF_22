import React, { useState } from 'react'
import Axios from 'axios';

function Register() {
    const [getName, setName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");


    // POST request using fetch with async/await
    function registerUser() {

            
        const newUserObject = { username: getName, email: getEmail, password: getPassword };
        console.log(newUserObject);
        if(newUserObject.username===''||newUserObject.email===''||newUserObject.password===''){
            alert('you need to fill in the entire form!')
        }
        else{

            
            Axios.post('http://localhost:8080/rest/process_register', newUserObject)
            
            .then(response => console.log(response.data))
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser();
    }

    return (
        <div id="register-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Register account</label>
                </div>
                <div className='stuff-container'>

                <input type="text" value={getEmail} onChange={(e) => setEmail(e.target.value)}
                    id="email-input" placeholder='E-mail'></input>
                    </div>

                <div className='stuff-container'>
                    <input type="text" value={getName} onChange={(e) => setName(e.target.value)}
                        id="userName-input" placeholder='User name'></input>
                </div>
                <div className='stuff-container'>
                    <input type="password" value={getPassword} onChange={(e) => setPassword(e.target.value)}
                        id="password-input" placeholder='Password'></input>
                </div>

                <button type="submit">Register new account</button>
            </form>
        </div>
    )
}
export default Register