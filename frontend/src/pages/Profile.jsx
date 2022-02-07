import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: this.props.userObj,
			userId: this.props.userObj.id,
			groups: []
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
		window.location.assign("http://localhost:3000/home");
	}

	async componentDidMount() {
		if(this.state.userId !== ''){
			axios
				.get("/getMembersByUserId/" + this.state.userId)
				.then((response) => response.data)
				.then((data) => {
					this.setState({ groups: data });
				});
		}
	}

	render() {
		return (
			<div className="profileContainer">
				<div> Welcome to profile </div>
				<Link to="/registerGroup">
					<button>Skapa grupp</button>
				</Link>
				<button onClick={this.terminateUserById}>Stäng av kontot</button>
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
				"/rest/groups/leaveGroup/" + props[key].id + "/" + user_id
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
