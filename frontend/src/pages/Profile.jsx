import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: this.props.userObj,
			groupsList: "",
		};
	}

	terminateUserById() {
		axios
			.put("/auth/terminateUser/" + this.state.userObj.id)
			.then((response) => {
				alert(response.data);
			});
	}
	logOut() {
		fetch("/logout", {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			mode: "no-cors",
		});
		window.location.reload(true);
	}

	async componentDidMount() {
		let groups;

		await axios
			.get("http://localhost:8080/rest/groups/getGroupsByUserId/40")
			.then((response) => {
				groups = response.data;
			});

		this.setState({ groupsList: groups });
	}

	render() {
		return (
			<div className="profileContainer">
				<div> Welcome to profile </div>
				<Link to="/createGroup">
					<button>Skapa grupp</button>
				</Link>
				<button>Hämta grupper</button>
				<button onClick={this.terminateUserById}>Stäng av kontot</button>
				<button onClick={this.logOut}>Logga ut</button>

				{RenderGroups(this.state.groupsList, this.state.userObj.id)}
			</div>
		);
	}
}

function RenderGroups(props, user_id) {
	if (typeof props !== "undefined") {
		function leaveGroup(key) {
			// console.log(props[key].id)

			axios.get(
				"http://localhost:8080/rest/groups/leaveGroup/" + props[key].id +"/" + user_id
            ).then((response) => {
                console.log(response.data)
            })
            window.location.reload()
		}
		let groups = Object.values(props);

		let groupList = [];
		for (let i = 0; i < groups.length; i++) {
			groupList.push(
				<div key={i} className="profile-groups-list">
					<p>{groups[i].title}</p>
					<button
						onClick={() => {
							leaveGroup(i);
						}}
					>
						Leave Group
					</button>
				</div>
			);
		}

		return groupList;
	} else {
		return <></>;
	}
}

export default Profile;
