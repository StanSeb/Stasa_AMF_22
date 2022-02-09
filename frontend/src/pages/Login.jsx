import React, { useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
   
    let navigate = useNavigate();

    // POST request using fetch with async/await
    async function loginUser(props) {
        // const newUserObject = { username: getEmail, password: getPassword };
        const credentials =
            "username=" +
            encodeURIComponent(getEmail) +
            "&password=" +
            encodeURIComponent(getPassword)
        if(getEmail === '' || getPassword === ''){
            alert("Du måste fylla i båda fälten")
        }else {
            await fetch("/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: 'no-cors',
                body: new URLSearchParams(credentials),
                
            }).catch(err => console.error(err))
            whoAmI(props)
        }
    }

    async function whoAmI(props) {
        await Axios
            .get("/rest/whoami", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin:*'
                }
            })
            .then((response) => {
                if(response.data !== ''){
                    const {id, username} = response.data
                    const userObject = {id: id, username: username}
                    props.storeId(userObject.id)
                    navigate("/home");
                    window.location.reload(true);
                }
                else {
                    alert("Fel inloggningsuppgifter! Försök igen.")
                }            
            })            
    }

    const handleSubmit = (event, props) => {
        event.preventDefault()
        loginUser(props);
    }

    return (
        <div id="login-form">
            <form onSubmit={(e) => handleSubmit(e, props)}>
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