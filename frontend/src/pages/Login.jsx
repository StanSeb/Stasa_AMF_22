import React, { Component } from "react";



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


class Login extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUser: null,
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

  test(){
    //navigate("/router");
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

  render() {
    return (
      <div className="App">
        <div id="login">
          <label>Email</label>
          <input id="email" type="text" />
          <label>Password</label>
          <input id="password" type="password" />
          <button onClick={this.login}>Login</button>
          <button> Register </button>
        </div>
        <div id="login-status">{this.getLoginStatus()}</div>
        <div id="my-comments"></div>
      </div>
    );
  }
}
export default Login;