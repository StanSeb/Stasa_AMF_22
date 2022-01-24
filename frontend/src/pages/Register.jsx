import React,{useState, useEffect} from 'react'
import Axios from 'axios';

function Register() {
   const [getName,setName] = useState("");
   const [getEmail, setEmail] = useState("");
   const [getPassword, setPassword] = useState("");

    // POST request using fetch with async/await
    function createPost(){
        let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhYTE0OGNkMDcyOGUzMDNkMzI2ZGU1NjBhMzVmYjFiYTMyYTUxNDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Rhc2EtZGEzZDUiLCJhdWQiOiJzdGFzYS1kYTNkNSIsImF1dGhfdGltZSI6MTY0MzAzMjk0MSwidXNlcl9pZCI6IjhXRHE1TzdHZEFTdm5ZbXp6V201ZmUzcWhMWjIiLCJzdWIiOiI4V0RxNU83R2RBU3ZuWW16eldtNWZlM3FoTFoyIiwiaWF0IjoxNjQzMDMyOTQxLCJleHAiOjE2NDMwMzY1NDEsImVtYWlsIjoiY29udGFjdGFiYmFzMDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImNvbnRhY3RhYmJhczA3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.UnbBg6pz-uqjKCGA_8H8VIeau3vvd55gbnLneTAflQ367SeEMTioszSxXyIhn6ltHW9QD5PTy1YgeZWYblc0P_fXeXRpuJdb_x0IRzAmMKxqYSFvD8zFwFPBU7zrjLp20DWUQLjNEksQfApsC7UMKy9lnKYrt5yvQe5X2fnuOioVMypdoHUSNGPv9Lm7yunifzyNNBsdH_BzYUUdMP6W6yuOldt4FUh3B-gMxIoyVUxc6ZHqts3MvSmh84SapgQHLY1s6AgJvT91bEKrVvs-WPWBe2KlF_1sAvk5LO6-IfjdJf4_n_LzjXAcuSsXngRvrquwXOekq3RR8SUwD-Gu_A";
        const registerObject = { email: getEmail, password: getPassword, privilage: 'user', usergroups: "test", username: getName};
        
        Axios({
            method: "POST",
            url: "http://localhost:8080/public/register",
            data: registerObject,
            headers: {Authorization: "Bearer " + token}
          })
            .then(res => {
            console.log(res)
            })
            .catch(err => {
            console.log(err)
          })

    }

   const handleSubmit =(event)=>{
       event.preventDefault();
       // kontrollerar att lösenordet är större eller lika med 6 characters.
       // om det är mindre än 6st så skapas inte kontot => felmeddelande.
       // större än 6 så skapas kontot
       getPassword.length >= 6 ? createPost():alert("Fel: Lösenordet måste vara större än 5 tecken!"); 
   }

    return (
        <div id="register-form">
            <form onSubmit={handleSubmit}>
            <label>Register account
                <div>

                <input type="text" value={getEmail} onChange={(e) => setEmail(e.target.value)} id="email-input" placeholder='E-mail'></input>
                </div>
                <div>

                <input type="text" value={getName} onChange={(e)=>setName(e.target.value)} id="userName-input" placeholder='User name'></input>
                </div>
                <div> 
                <input type="password" value={getPassword} onChange={(e) => setPassword(e.target.value)} id="password-input" placeholder='Password'></input>
                </div>
            </label>

             <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register