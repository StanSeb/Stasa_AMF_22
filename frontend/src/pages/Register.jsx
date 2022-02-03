import React, { useState } from 'react'
import Axios from 'axios';
import  {Link} from 'react-router-dom';


function Register() {
    const [getName, setName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getToggledRules, setToggledRules] = useState(false);
    const [getToggledIntegrity, setToggledIntegrity] = useState(false);
    

    // POST request using fetch with async/await
    function registerUser() {
        const newUserObject = { username: getName, email: getEmail, password: getPassword };
        if (newUserObject.username === '' || newUserObject.email === '' || newUserObject.password === '') {
            alert('Du måste fylla i alla fälten!')
        }else if(getToggledRules===false || getToggledIntegrity===false){
            alert("Du måste läsa våra regler och integritetspolicys")
        }
        else {
            Axios.post('http://localhost:8080/rest/process_register', newUserObject)

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
                        id="password-input" placeholder='Password' minLength="8" maxLength="25"></input>
                </div>
                <div>
                    <label htmlFor="">Lösenordet måste vara 8 karaktärer långt minimum</label>
                </div>

                <div className='rule-link'>
                    <input type="checkbox" checked={getToggledRules} onChange={(e) => setToggledRules(e.target.checked)} />
                    <Link to="/rules"><p>Läs regler för att använda hemsida</p></Link>
                </div>

                <div className='rule-link'>
                    <input type="checkbox" checked={getToggledIntegrity} onChange={(e) => setToggledIntegrity(e.target.checked)} />
                    <Link to="/integrity"><p>Hur vi hanterar personlig integritet</p></Link>
                </div>
                <button type="submit">Register new account</button>
            </form>
        </div>
    )
}
export default Register