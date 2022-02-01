import React, { useState } from 'react'
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Login() {

    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
   


    let navigate = useNavigate();



    // POST request using fetch with async/await
    async function loginUser() {
        // const newUserObject = { username: getEmail, password: getPassword };
        const credentials =
            "username=" +
            encodeURIComponent(getEmail) +
            "&password=" +
            encodeURIComponent(getPassword)
        if(getEmail===''||getPassword===''){
            alert("Du måste fylla i båda fälten")

        }
        else{

            await fetch("/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                mode: 'no-cors',
                body: credentials,
                
            })
            whoAmI()
        }
    }
    async function whoAmI() {

        await Axios
            .get("/rest/whoami", {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin:*'
                }
            })
            .then((response) => {
                console.log(response.data)
                if(response.data !=''){
                    navigate('/');
                }
                else{
                    alert("Fel inloggningsuppgifter! Försök igen")
                }
            
            })
            
    }
    async function logOut() {
        await fetch("/logout", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors',
        })
        navigate("/");
    }



    const handleSubmit = (event) => {
        event.preventDefault()
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
            <div>
            <button onClick={() => logOut()}>logout</button>
            </div>
        </div>
    )
}
export default Login