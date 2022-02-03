import React, { Component } from "react";
import "./App.css";
import "./index.css";
import Axios from "axios";
import Navbar from "./components/Navbar";
import GroupPage from "./pages/GroupPage";

class App extends Component {
	constructor() {
		super();
		this.state = {
			userID: "",
			group: {
				id: 1,
				name: "Bonds ''Speciella'' Klubb",
				info: "Här pratar vi bara om hemliga agenter",
				admin: "Leif Bond",
			},
		};
		this.handleWhoAmI = this.handleWhoAmI.bind(this);
	}

	handleWhoAmI(id) {
		this.setState({ userID: id }, () => {
			console.log(this.state.userID);
		});
	}

	componentDidMount() {
		Axios.get("/rest/whoami", {
			headers: {
				"Content-Type":
					"application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin:*",
			},
		}).then((response) => {
			// console.log(response.data);
			if (response.data != "") {
				const { id, username } = response.data;

				const userObject = { id: id, username: username };
				this.setState({ userID: userObject });
			}
		});
	}

	render() {
		return (
			<>
				<Navbar storeId={this.handleWhoAmI} userObj={this.state.userID} />
				<GroupPage group={this.state.group} loggedInUser={this.state.userID} />
			</>
		);
	}
}
export default App;
