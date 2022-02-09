import React, { Component } from "react";
import "./App.css";
import "./index.css";
import Axios from "axios";
import Navbar from "./components/Navbar";
import ReportPopup from "./components/ReportPopup";
import ReportContextProvider from "./contexts/ReportContext";
import AppContextProvider from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";

class App extends Component {
	static contextType = AuthContext;

	constructor() {
		super();
		this.state = {
			user: {
				id: "",
				username: ""
			},
		};
		this.handleWhoAmI = this.handleWhoAmI.bind(this);
		this.instanceRef = React.createRef();
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
					console.log("Status: " + response.status);
				}
			});
	}

	render() {
		return (
			<AppContextProvider>
				<ReportContextProvider>
					<Navbar storeId={this.handleWhoAmI} userObj={this.state.user} />
					<ReportPopup userObj={this.state.user} />
				</ReportContextProvider>
			</AppContextProvider>
		);
	}
}
export default App;
