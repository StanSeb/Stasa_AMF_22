import React, { Component } from "react";
import "./App.css";
import "./index.css"
import Navbar from './components/Navbar'
import GroupPage from "./pages/GroupPage";
import axios from "axios";
import NewThread from "./components/NewThread"

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedInUser: { id: 38, username: "Leif Bond", privilege: "admin" },
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
				<GroupPage
					group={this.state.group}
					loggedInUser={this.state.loggedInUser}
				/>
				{/* <NewThread /> */}
			</div>
		);
	}
}
export default App;