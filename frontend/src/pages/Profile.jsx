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
		this.fetchAll = this.fetchAll.bind(this);
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
		}).then(() => {
			window.location.assign("http://localhost:3000/");
		});
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

	fetchAll() {
		this.checkIfAdmin();
		this.fetchGroups();
	}

	/* Fetcha när userObj (inloggade användaren) har fått sitt värde. Blir annars error. */
	componentDidUpdate(prevProps) {
		if (this.props.userObj !== prevProps.userObj) {
			this.fetchAll();
		}
	}

	componentDidMount() {
		// If you're on another page and the go to this one, we have to fetch everything again because this component was unmounted (and state reset).
		// Although we don't want to fetch anything if user is not logged in (like when component mounts before logged in user has been set)
		// If so, the fetching will be done in componentDidUpdate.
		if (this.props.userObj.id) {
			this.fetchAll();
		}
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

				<div>
					<h2 style={{display: listItems.length > 0 ? 'block' : 'none'}}>Inbjudningar</h2>
					{listItems}
				</div>

				<h2>Grupper</h2>
				{RenderGroups(
					this.state.groups,
					this.state.userObj.id,
					this.fetchGroups,
					this.state.profileId,
					this.state.isAdmin
				)}
				<ReportList />
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
