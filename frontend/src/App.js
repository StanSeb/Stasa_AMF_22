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

	render() {
		return (
			<div className="App">
				<Navbar />
				{/* <GroupPage
					group={this.state.group}
					loggedInUser={this.state.loggedInUser}
				/> */}
			</div>
		);
	}
}
export default App;