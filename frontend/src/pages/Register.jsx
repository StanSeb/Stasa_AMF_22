import React,{useState} from 'react'

function Register() {
    const [name,setName] = useState("");

    // hämtar ut browseId
   // const { id } = props.match.params
   const handleSubmit =(event)=>{
       event.preventDefault();
    alert('your account is being created: '+name)
   }

    return (
        <div id="register-form">
            <form onSubmit={handleSubmit}>
            <label>Register account
                <div>

                <input type="text" id="email-input" placeholder='E-mail'></input>
                </div>
                <div>

                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="userName-input" placeholder='User name'></input>
                </div>
                <div> 
                <input type="text" id="password-input" placeholder='Password'></input>
                </div>
            </label>

             <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register