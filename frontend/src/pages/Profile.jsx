import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: props.userObj,
			userId: props.userObj.id,
			groups: []
		};
	}

	 checkIfSignedId(id) {
		const profileID = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

		if (id == profileID || this.checkIfAdmin(id)) {
			function terminateUserById() {
				console.log(id)
				axios.put("/auth/terminateUser/" + id)
					.then(response => {
						alert(response.data)
					}).catch((error) => {
						console.log(error)
					})
			}
			return <button onClick={terminateUserById}>Stäng av kontot</button>;
		}
		return <></>;
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
		axios
			.get("/rest/getMembersByUserId/" + this.state.userId)
			.then((response) => response.data)
			.then((data) => {
				this.setState({ groups: data });
			});
	}


	checkIfAdmin(id) {
		if (typeof (id) != "undefined") {
			axios.get("/rest/isAdmin/" + id)
				.then(response => {
					return response.data;
				})
		}
	}

	render() {
		return (
			<div className="profileContainer">
				<div> Welcome to profile </div>
				<Link to="/registerGroup">
					<button>Skapa grupp</button>
				</Link>
				{this.checkIfSignedId(this.state.userObj.id)}
				<button onClick={this.logOut}>Logga ut</button>

				{RenderGroups(this.state.groupsList, this.state.userObj.id)}

				<div>{this.state.groups.map((group) => (
					<ul key={group.id}>
						<li> Title: <span>{group.group.title}</span> <br />
							Description: <span>{group.group.description}</span> <br />
							Role: <span>{group.memberRoles.title}</span> <br />
						</li>
					</ul>
				))}</div>
			</div>
		);
	}
}



function RenderGroups(props, user_id) {
	if (typeof props !== "undefined") {
		function leaveGroup(key) {

			axios.get(
				"http://localhost:8080/rest/groups/leaveGroup/" + props[key].id + "/" + user_id
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
    }    
}

export default Profile;
