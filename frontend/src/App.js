import React, { Component } from "react";
import "./App.css";
import "./index.css"
import Navbar from './components/Navbar'
import GroupPage from "./pages/GroupPage";

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedInUser: { id: 7, username: "Leif Bond", privilege: "admin" },
			group: {
				id: 1,
				name: "Bonds ''Speciella'' Klubb",
				info: "Här pratar vi bara om hemliga agenter",
				admin: "Leif Bond",
			},
			thread: "",
		};
	}

  constructor(){
    super();
    this.state = {userID: 0} 
    this.handleWhoAmI = this.handleWhoAmI.bind(this)
  }

  handleWhoAmI(id){
    this.setState({userID: id}, ()=> {
      console.log(this.state.userID)
    })
  }

  render() {
    return (
      <Navbar storeId={this.handleWhoAmI} userObj={this.state.userID}/>
    )
  }
}
export default App;