import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import "../components/ReportPopup.scss";
import ReportList from "../components/ReportList";

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: props.userObj,
			userId: props.userObj.id,
			invitations: [],
			groups: [],
			profileId: window.location.href.substring(
				window.location.href.lastIndexOf("/") + 1
			),
			isAdmin: false,
		};

		this.fetchGroups = this.fetchGroups.bind(this);
	}

	async accept(groupId, invitationId) {
		const memberObject = {
			user: { id: this.state.userId },
			memberRole: { id: 4 },
			group: { id: groupId },
		};

		await axios.post("/rest/member/join", memberObject);

		//DELETE: Ta bort invitation
		await axios
			.delete("/rest/deleteInvitation/" + invitationId)
			.then((response) => console.log(response.data));

		this.componentDidMount();
	}

	async deny(invitationId) {
		//DELETE: Ta bort invitation
		await axios
			.delete("/rest/deleteInvitation/" + invitationId)
			.then((response) => console.log(response.data));

		this.componentDidMount();
	}

	checkIfSignedId(id) {
		const profileID = window.location.href.substring(
			window.location.href.lastIndexOf("/") + 1
		);

		if (id == profileID || this.state.isAdmin) {
			function terminateUserById() {
				if (window.confirm("e du heeeeeeelt säker?"))
					axios
						.put("/auth/terminateUser/" + profileID)
						.then((response) => {
							alert(response.data);
							fetch("/logout", {
								headers: {
									"Content-Type": "application/x-www-form-urlencoded",
								},
								mode: "no-cors",
							});
							window.location.assign("http://localhost:3000/");
						})
						.catch((error) => {
							console.log(error);
						});
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
		window.location.assign("http://localhost:3000/");
	}

	componentDidMount() {
		this.checkIfAdmin();
		this.fetchGroups();
	}

	fetchGroups() {
		axios
			.get("/rest/member/getActiveDataByUserId/" + this.state.profileId)
			.then((response) => response.data)
			.then((data) => {
				this.setState({ groups: data });
			});

		axios.get("/rest/invitations/" + this.state.userId).then((response) => {
			this.setState({ invitations: response.data });
		});
	}

	checkIfAdmin() {
		if (typeof this.props.userObj.id != "undefined") {
			axios.get("/rest/isAdmin/" + this.props.userObj.id).then((response) => {
				this.setState({ isAdmin: response.data });
			});
		}
	}

	render() {
		const data = this.state.invitations;
		const listItems = data.map((d) => (
			<li key={d.id}>
				<h4>Inbjuden av: {d.username} </h4>
				<p>
					Grupp: {d.title}
					<button onClick={() => this.accept(d.groupId, d.id)}>Godkänn</button>
					<button onClick={() => this.deny(d.id)}>Neka</button>
				</p>
			</li>
		));

		return (
			<div className="profileContainer">
				<div> Welcome to profile </div>
				<Link to="/registerGroup">
					<button>Skapa grupp</button>
				</Link>
				{this.checkIfSignedId(this.state.userId)}
				<button onClick={this.logOut}>Logga ut</button>

				<div>{listItems}</div>

				{RenderGroups(
					this.state.groups,
					this.state.userObj.id,
					this.fetchGroups,
					this.state.profileId,
					this.state.isAdmin
				)}
				<div 
							style={{
								display: this.state.isAdmin ? "block" : "none",
							}}>
					<ReportList />
				</div>
			</div>
		);
	}
}

function RenderGroups(groups, user_id, fetchGroups, profileId, isAdmin) {
	if (typeof groups !== "undefined") {
		let groupsValues = Object.values(groups);

		let groupList = [];
		for (let i = 0; i < groupsValues.length; i++) {
			groupList.push(
				<div key={i} className="profile-groups-list">
					<div>
						<Link to={`/group/${groupsValues[i].group.id}`}>
							<span>{groupsValues[i].group.title}</span>
						</Link>{" "}
						<br />
						Description: <span>{groupsValues[i].group.description}</span> <br />
						Role: <span>{groupsValues[i].memberRole.title}</span> <br />
					</div>
					{checkIfAdmin(
						groupsValues[i].memberRole.title,
						groupsValues[i].group,
						user_id,
						fetchGroups,
						profileId,
						isAdmin
					)}
					<div className="profile-group-buttons"></div>
				</div>
			);
		}
		return groupList;
	}
}
function checkIfAdmin(role, group, userId, fetchGroups, profileId, isAdmin) {
	if (userId == profileId || isAdmin) {
		function leaveGroup(key) {
			if (
				window.confirm(
					"Är du säker på att du vill lämna gruppen: " + group.title
				)
			)
				axios
					.delete("/rest/member/delete/" + key + "/" + userId)
					.then((response) => {
						console.log(response.data);
						fetchGroups();
					});
		}
		function deleteGroup(id) {
			if (
				window.confirm(
					"Är du säker på att du vill ta bort denna gruppen: " + group.title
				)
			)
				axios.put("/rest/groups/deleteGroup/" + id).then((response) => {
					alert("Grupp med namnet: " + group.title + " har tagits bort");
					fetchGroups();
				});
		}
		if (role === "GROUPADMIN" || isAdmin) {
			return (
				<button
					onClick={() => {
						deleteGroup(group.id);
					}}
				>
					Ta bort Grupp
				</button>
			);
		} else if (!isAdmin) {
			return (
				<button
					onClick={() => {
						leaveGroup(group.id);
					}}
				>
					Lämna Grupp
				</button>
			);
		}
	} else {
		return <></>;
	}
}

export default Profile;
