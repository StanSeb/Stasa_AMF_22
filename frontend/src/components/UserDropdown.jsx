import React from "react";
import axios from "axios";
import { ReportContext } from "../contexts/ReportContext";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const reportType = 1; // member report type (in database)

class UserDropdown extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			member: {
				user: { id: "" },
				memberRole: { id: "" },
				group: { id: "" },
			},
			user: this.props.user, // <- member, inte user
			loggedInMember: this.props.loggedInMember,
			clickedProfile: false,
		};

		this.updateMemberRole = this.updateMemberRole.bind(this);
		this.deleteMember = this.deleteMember.bind(this);
		this.handleReport = this.handleReport.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.sendMemberToBlacklist = this.sendMemberToBlacklist.bind(this);
	}

	handleClick(event) {
		let buttonClicked = event.target.innerText;
		console.log(buttonClicked + ", " + this.state.user.username);
		console.log(this.state.user.userId);
		this.setState({ clickedProfile: true });
	}

	updateMemberRole() {
		let member;
		// console.log("USERRRRRR: ", this.props.user);
		if (this.props.user.role == "MEMBER") {
			member = {
				user: { id: this.props.user.userId },
				memberRole: { id: 3 }, // id av "moderator" i Tabellen member_roles i Databasen.
				group: {
					id: window.location.href.substring(
						window.location.href.lastIndexOf("/") + 1
					),
				},
			};
			// console.log("MEMBER: ", member);
		} else if (this.props.user.role == "GROUPMODERATOR") {
			// console.log("GROUPMODERATOR");
			member = {
				user: { id: this.props.user.userId },
				memberRole: { id: 4 }, // id av "member" i Tabellen member_roles i Databasen.
				group: {
					id: window.location.href.substring(
						window.location.href.lastIndexOf("/") + 1
					),
				},
			};
		}

		this.setState({ member }, () => {
			axios
				.put("/rest/member/updateMemberRole", this.state.member)
				.then((response) => {
					alert(response.data);

					this.props.fetchMembers();
				});
		});
	}

	sendMemberToBlacklist() {
		let member = {
			user: { id: this.props.user.userId },
			memberRole: { id: 4 },
			group: {
				id: window.location.href.substring(
					window.location.href.lastIndexOf("/") + 1
				),
			},
		};
		this.setState({ member }, () => {
			axios
				.post("/rest/member/userToBlacklist", this.state.member)
				.then((response) => {
					alert(response.data);
					this.props.fetchMembers();
					this.props.fetchBlackList();
				});
		});
	}

	deleteMember() {
		let id = this.state.user.userId; //id = member id, alltså id från Member entitet
		console.log("this.state.user.id", id);
		console.log(this.state.user);
		if (window.confirm("Är du säger på att du vill ta bort " + this.state.user.username)) {
			axios
				.delete("/rest/member/delete/" + this.state.user.groupId + "/" + id)
				.then((response) => {
					this.props.fetchMembers();
				});
		}
	}

	handleReport(showReportPopup) {
		showReportPopup({ targetType: reportType, targetId: this.props.user.id /* <-- member id */ });
	}

	render() {
		if (this.state.clickedProfile) {
			return <Navigate to={"/profile/" + this.props.user.userId} />
		} else {
			return (
				<ReportContext.Consumer>
					{(context) => {
						const { showReportPopup } = context;
						const loggedInUser = this.context.loggedInUser;
						return (
							<div className="user-drop">
								{CheckUser(this.props.user)}
								<div className="user-drop-content">
									{CheckYourrole(
										this.props.user,
										this.props.loggedInMember,
										this.updateMemberRole,
										this.deleteMember,
										this.handleReport,
										this.handleClick,
										showReportPopup,
										this.context.loggedInUser,
										this.props.isAdmin,
										this.sendMemberToBlacklist
									)}
								</div>
							</div>
						);
					}}
				</ReportContext.Consumer>
			);
		} //test bracket
	}
}

function CheckUser(props) {
	let button;

	if (props.role === "GROUPADMIN") {
		button = (
			<button className="user-drop-button" id="group-admin">
				{props.username}
			</button>
		);
	} else if (props.role === "GROUPMODERATOR") {
		button = (
			<button className="user-drop-button" id="group-moderator">
				{props.username}
			</button>
		);
	} else {
		button = <button className="user-drop-button">{props.username}</button>;
	}
	return button;
}

function CheckYourrole(
	user,
	loggedInMember /*<- detta är en member, inte en user.*/,
	updateMemberRole,
	deleteMember,
	handleReport,
	handleClick,
	showReportPopup,
	realLoggedInUser,
	isAdmin,
	sendMemberToBlacklist
) {
	let dropdownOptions;
	const userId = user.userId;
	if (
		isAdmin ||
		(loggedInMember.role === "GROUPADMIN" &&
			user.role !== "GROUPADMIN" &&
			user.role !== "GROUPMODERATOR")
	) {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + userId}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>

				<button onClick={() => updateMemberRole()}>Make moderator</button>

				<button onClick={() => deleteMember()}>Remove from group</button>
				<button onClick={() => sendMemberToBlacklist()}>Blacklist</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else if (
		loggedInMember.role === "GROUPADMIN" &&
		user.role === "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + userId}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>
				<button onClick={() => updateMemberRole()}>Remove Moderator</button>
				<button onClick={() => deleteMember()}>Remove from group</button>
				<button onClick={() => sendMemberToBlacklist()}>Blacklist</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else if (
		loggedInMember.role === "GROUPMODERATOR" &&
		user.role !== "GROUPADMIN" &&
		user.role !== "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + userId}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>
				<button onClick={() => deleteMember()}>Remove from group</button>
				<button onClick={() => sendMemberToBlacklist()}>Blacklist</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + userId}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	}
	return dropdownOptions;
}

function ReportButton(
	realLoggedInUser,
	handleReport,
	showReportPopup,
	targetMember
) {
	if (realLoggedInUser == null) {
		return;
	}

	// Don't show report button on yourself.
	if(targetMember.userId === realLoggedInUser.id) {
		return;
	}

	let isTargetLoggedInUser = realLoggedInUser.id === targetMember.user_id;

	if (realLoggedInUser !== null && !isTargetLoggedInUser) {
		return (
			<button onClick={(e) => handleReport(showReportPopup)}>Report</button>
		);
	}
}

export default UserDropdown;
