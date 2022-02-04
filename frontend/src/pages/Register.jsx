import React, { useState } from 'react'
import Axios from 'axios';
import  { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [getName, setName] = useState("");
    const [isNameOk, setIsNameOk] = useState(0);
    const [isEmailOk, setIsEmailOk] = useState(0);
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");
    const [getToggledRules, setToggledRules] = useState(false);
    const [getToggledIntegrity, setToggledIntegrity] = useState(false);

    let navigate = useNavigate();    

    function registerUser() {
        const newUserObject = { username: getName, email: getEmail, password: getPassword };
        if (newUserObject.username === '' || newUserObject.email === '' || newUserObject.password === '') {
            alert('Du måste fylla i alla fälten!')
        }
        else if(getToggledRules===false || getToggledIntegrity===false){
            alert("Du måste läsa våra regler och integritetspolicys")
        }
        else {
            Axios.post('http://localhost:8080/rest/process_register', newUserObject)
            navigate("/mailSent", {state: {email: getEmail}});
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isNameOk === 1) {
            registerUser();
        }
    }

    function checkEmailAvailability() {
        Axios.get('/rest/validateEmail/' + getEmail).then(response => {
            if(response.data === false) {
                setIsEmailOk(1);
            } else {
                setIsEmailOk(2);
                alert("Användarnamnet är upptaget.")
            }            
        })   
    }

    function checkNameAvailability() {
        Axios.get('/rest/username/' + getName).then(response => {
            if(response.data !== getName) {
                setIsNameOk(1);
            } else {
                setIsNameOk(2);
                alert("Användarnamnet är upptaget.")
            }            
        })      
    }

    return (
        <div id="register-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Register account</label>
                </div>
                <div className='stuff-container check-container'>
                    <input type="text" value={getEmail} onChange={(e) => setEmail(e.target.value)} onBlur={() => checkEmailAvailability()}
                        id="email-input" placeholder='E-postadress'></input>
                    <p style={{ display: isEmailOk === 1 ? 'block' : 'none' }}>✅</p>
                    <p style={{ display: isEmailOk === 2 ? 'block' : 'none' }}>❌</p>
                </div>

                <div className='stuff-container check-container'>
                    <input type="text" value={getName} onChange={(e) => setName(e.target.value)} onBlur={() => checkNameAvailability()}
                        id="userName-input" placeholder='Användarnamn'></input>
                    <p style={{ display: isNameOk === 1 ? 'block' : 'none' }}>✅</p>
                    <p style={{ display: isNameOk === 2 ? 'block' : 'none' }}>❌</p>
                </div>

                <div className='stuff-container'>
                    <input type="password" value={getPassword} onChange={(e) => setPassword(e.target.value)}
                        id="password-input" placeholder='Lösenord' minLength="8" maxLength="25"></input>
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