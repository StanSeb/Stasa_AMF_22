import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: props.userObj,
			userId: props.userObj.id,
			groups: [],
			invitations: [],
		};
	}

	async accept(groupId, invitationId){

		const memberObject = {
			user: { id: this.state.userId, },
			memberRole: { id: 4 },
			group: { id: groupId },
		}

		await axios.post("/rest/member/join",  memberObject)

		//DELETE: Ta bort invitation
		await axios.delete("/rest/deleteInvitation/"+ invitationId)
		.then((response) => console.log(response.data))

		this.componentDidMount();
	}

	async deny(invitationId){
		//DELETE: Ta bort invitation
		await axios.delete("/rest/deleteInvitation/"+ invitationId)
		.then((response) => console.log(response.data))

		this.componentDidMount();
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
		window.location.assign("http://localhost:3000/home");
	}

	async componentDidMount() {
		await axios
			.get("/rest/member/getMembersByUserId/" + this.state.userId)
			.then((response) => response.data)
			.then((data) => {
				this.setState({ groups: data });
			});
		
		await axios.get("/rest/invitations/" + this.state.userId)
		.then((response) => {
				this.setState({invitations: response.data})
				console.log(response.data)
			}
		);
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

		const data = this.state.invitations
		const listItems = data.map((d) => <li key={d.id}>
			<h4>Inbjuden av: {d.username} </h4>
			<p>Grupp: {d.title} 
		
			<button onClick={() => this.accept(d.groupId, d.id)}>Godkänn</button>
			<button onClick={() => this.deny(d.id)}>Neka</button>
			</p>
		</li>);

		return (
			<div className="profileContainer">
				<div> Welcome to profile </div>
				<Link to="/registerGroup">
					<button>Skapa grupp</button>
				</Link>
				{this.checkIfSignedId(this.state.userObj.id)}
				<button onClick={this.logOut}>Logga ut</button>

				
				<div>
					{listItems}
				</div>

				{RenderGroups(this.state.groupsList, this.state.userObj.id)}

				<div>{this.state.groups.map((group) => (
					<ul key={group.id}>
						<li> Title: <span>{group.group.title}</span> <br />
							Description: <span>{group.group.description}</span> <br />
							Role: <span>{group.memberRole.title}</span> <br />
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
	}
}

export default Profile;
