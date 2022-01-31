import React, { Component } from "react";
import "./App.css";
import "./index.css";
import GroupPage from "./pages/GroupPage";
// import NewThread from './components/NewThread'
import ThreadPage from "./pages/ThreadPage";

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
				{/* <NewThread user_id={this.state.loggedInUser.id} group_id={this.state.group.id}/> */}
				<GroupPage
					group={this.state.group}
					loggedInUser={this.state.loggedInUser}
				/>
				{/* <ThreadPage
					loggedInUser={this.state.loggedInUser}
				/> */}
			</div>
		);
	}
}
export default App;
