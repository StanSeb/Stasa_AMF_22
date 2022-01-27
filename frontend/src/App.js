import React, { Component } from "react";
import "./App.css";
import "./index.css";
import GroupPage from "./pages/GroupPage";
import Navbar from "./components/Navbar";

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedInUser: { id: 1, username: "Leif Bond", privilege: "admin" },
			group: {
				name: "Bonds ''Speciella'' Klubb",
				info: "Här pratar vi bara om hemliga agenter",
				admin: "Leif Bond",
			},
		};
	}

	render() {
		return (
			<div className="App">
        <Navbar/>
				{/* <GroupPage
					group={this.state.group}
					loggedInUser={this.state.loggedInUser}
				/> */}
			</div>
		);
	}
}
export default App;