import React, { Component } from "react";
import "./App.css";
import "./index.css";
import Axios from "axios";
import Navbar from "./components/Navbar";

class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				id: "",
				username: ""
			},
		};
		this.handleWhoAmI = this.handleWhoAmI.bind(this);
	}

	handleWhoAmI(id) {
		this.setState({ user: { id: id } }, () => {
		});
	}

	componentDidMount() {
		Axios
			.get("/rest/whoami", {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;Access-Control-Allow-Origin:*'
				}
			})
			.then((response) => {
				if (response.data !== '') {
					const { id, username } = response.data
					const userObject = { id: id, username: username };
					this.setState({ user: userObject });
				} else {
					console.log("Status: " + response.status)
				}
			});
	}

	render() {
		return (
			<Navbar storeId={this.handleWhoAmI} userObj={this.state.user} />
		);
	}
}
export default App;
