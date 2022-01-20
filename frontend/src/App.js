import React, { Component, useState } from "react";
import "./App.css";
import { BrowserRouter as Router,
   Route, 
   Routes 
} from "react-router-dom";
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import RegisterGroup from './components/RegisterGroup'
import GroupComponent from './components/GroupComponent'
 

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4NtJUK04sd37ljBGROU4E4ChKiGl-R_k",
  authDomain: "stasa-da3d5.firebaseapp.com",
  projectId: "stasa-da3d5",
  storageBucket: "stasa-da3d5.appspot.com",
  messagingSenderId: "219877207531",
  appId: "1:219877207531:web:a65cb808e025a6aec5bdae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUser: null,
      thread: {title: "", content: "", username: ""},
    };
  }

  componentWillMount() {
    onAuthStateChanged(auth, (user) => {
      console.log("AUTH STATE CHANGED!");
      if (user) {
        console.log("User:", user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({ loggedInUser: user });
      } else {
        this.setState({ loggedInUser: null });
      }
    });
  }

  login(email, password) {
    signInWithEmailAndPassword(
      auth,
      document.getElementById("email").value,
      document.getElementById("password").value
    ).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
    });
  }

  logout() {
    auth.signOut();
  }

  getLoginStatus() {
    if (this.state.loggedInUser) {
      return (
        <p>Logged in as user with email {this.state.loggedInUser.email}</p>
      );
    } else {
      return <p>Not logged in.</p>;
    }
  }

  async componentDidMount() {
    //GET THIS SHIT!
    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Rhc2EtZGEzZDUiLCJhdWQiOiJzdGFzYS1kYTNkNSIsImF1dGhfdGltZSI6MTY0MjY4ODIxNSwidXNlcl9pZCI6InJZNHRUS2VEQUViRkhReXZRUUhiNXBIbXllVjIiLCJzdWIiOiJyWTR0VEtlREFFYkZIUXl2UVFIYjVwSG15ZVYyIiwiaWF0IjoxNjQyNjg4MjE1LCJleHAiOjE2NDI2OTE4MTUsImVtYWlsIjoibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ibAUW1_bf1cdkf_WZOIx4mlSsyK5rnrzWv4N0SQV2QKf0Jq8CqhyTQhQHb3h3LvXsXKF1ZuMsLXKXnubU_FRE9jnZgLDXXI_LLP3EGJvn870Bl0HSIS6_QI4yZmSc1-UUsSrD68X_9lDzbdiGM-ccA0x1bXFzbrc_xovKPbbbYSfUULWgMVVlc2VcfXT9vNScu7n6_G9vVGm6_mgiaSzuUEt5CU16_heF0DLi4oVr4KvS8b47iwPLx2EgS13lV7Maz8UcbgeKwmKVaMqpJg81tWvgy9JBKdfH7fVKf6BkpQEc-OmtwjmD0Unl0_X0qy0QpLG0x7Z-D7CZOG9EIJowA";
    const config = {
      headers: {Authorization: "Bearer " + token}
    }
    await Axios.get('http://localhost:8080/threads/getforuser?userId=iey6vYYcnEerpyyKCVHGE6vGyss2', config)
      .then(response => response.data)
      .then((data) => {
        let title = data[0].title;
        let content = data[0].content;
        let username = data[0].user_id;
        this.setState({ thread: {title: title, content: content, username: username} })})
  }

  render() {
    return (
      <Router>
        

      <div className="App">
        <Thread thread={{title: this.state.thread.title, username: this.state.thread.username, content: this.state.thread.content}}/>
        <NewThread/>
        <div id="login">
          <label>Email</label>
          <input id="email" type="text" />
          <label>Password</label>
          <input id="password" type="password" />
          <button onClick={this.login}>Login</button>
        </div>
        <div id="login-status">{this.getLoginStatus()}</div>
        <div id="my-comments"></div>
        </div>  
        <Navbar/>  
        <Routes>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/createGroup" element={<RegisterGroup/>} />
        <Route path="/getGroups" element={<GroupComponent/>} />

        </Routes>    
      </Router>
    );
  }
}
export default App;
