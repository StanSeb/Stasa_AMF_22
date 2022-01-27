import React, { useState, useEffect } from 'react'
import Axios from 'axios';

function Register() {
    const [getName, setName] = useState("");
    const [getEmail, setEmail] = useState("");
    const [getPassword, setPassword] = useState("");

    // POST request using fetch with async/await
    function createPost() {
        // Simple POST request with a JSON body using axios

        // skapa objektet för användaren:
        // user = {email: 1, username: 2, password: 3}

        let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhYTE0OGNkMDcyOGUzMDNkMzI2ZGU1NjBhMzVmYjFiYTMyYTUxNDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Rhc2EtZGEzZDUiLCJhdWQiOiJzdGFzYS1kYTNkNSIsImF1dGhfdGltZSI6MTY0MzAxNzkyMywidXNlcl9pZCI6Illaa3VWZDZRY3RaQllmU3RWbHQ1bkFvcjk1bzEiLCJzdWIiOiJZWmt1VmQ2UWN0WkJZZlN0Vmx0NW5Bb3I5NW8xIiwiaWF0IjoxNjQzMDE3OTIzLCJleHAiOjE2NDMwMjE1MjMsImVtYWlsIjoicnAudWxsc3RvcnA5MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicnAudWxsc3RvcnA5MkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.JtfSd4ujSmgaSsj0WXiiJpjb9pVfKrwSSD_L_nswfHkxQ-b7LMdJQM7SfTplN33ZMtHoPTJaJWMdFi2_u-Ut4ebXfDcnhxKo9Bk0txUeRH-ZQDCW-_hOE5Uk7rbqjsiwHSFoR6Nwuka0UTf3471EyW5rznvH-yEc5AsoW3QGhgNz4K82iQK8ZsibmcbM9O7giBFSQh3VHvydASd3zauogp6hunEeXzIZkFyyT6Bdp3823yEKmqFjED1AdYCLyHVq1uOM5T2GFUGJ7uWMKW2K6wad-3hiC1-xv3GF6DKvltpSAfTTQDI1egQJH0nE7sfQYZZmFloXW7NRgUbQLfO-oQ";
        const registerObject = { email: getEmail, password: getPassword, privilage: 'user', usergroups: "test", username: getName };
        Axios({
            method: "POST",
            url: "http://localhost:8080/process_register",
            data: registerObject,
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

        // const headers = { 
        //     'Authorization': 'Bearer ' + token,
        // };
        // axios.post('http://localhost:8080/api/post', article, { headers })
        //     .then(response => console.log(response));

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createPost();
    }

    return (
        <div id="register-form">
            <form onSubmit={handleSubmit}>
                <label>Register account
                    <div>

                        <input type="text" value={getEmail} onChange={(e) => setEmail(e.target.value)} id="email-input" placeholder='E-mail'></input>
                    </div>
                    <div>

                        <input type="text" value={getName} onChange={(e) => setName(e.target.value)} id="userName-input" placeholder='User name'></input>
                    </div>
                    <div>
                        <input type="text" value={getPassword} onChange={(e) => setPassword(e.target.value)} id="password-input" placeholder='Password'></input>
                    </div>
                </label>
            </form>
        </div>
    )
}
export default Register