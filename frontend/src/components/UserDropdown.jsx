import React from "react";
import axios from 'axios';
import { ReportContext } from "../contexts/ReportContext";
import { AuthContext } from "../contexts/AuthContext";

const reportType = 1; // user report type (in database)

class UserDropdown extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		super(props);
		this.state = {
			moderator: {
				user: { id: "" },
				memberRole: { id: "" },
				group: { id: "" },
			},
			user: this.props.user, // <- member, inte user
			loggedInUser: this.props.loggedInUser,
		};

		this.updateMemberRole = this.updateMemberRole.bind(this);
		this.deleteMember = this.deleteMember.bind(this);
		this.handleReport = this.handleReport.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
		let buttonClicked = event.target.innerText;
		console.log(buttonClicked + ", " + this.state.user.username);
		console.log(this.state.user.id)
	}

	updateMemberRole() {
		let moderator;


		if (this.props.user.role == "MEMBER") {
			moderator = {
				user: { id: this.props.user.id },
				memberRole: { id: 3 }, // id av "moderator" i Tabellen member_roles i Databasen.
				group: { id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1) },
			};
		} else if (this.props.user.role == "GROUPMODERATOR") {
			moderator = {
				user: { id: this.props.user.id },
				memberRole: { id: 4 }, // id av "member" i Tabellen member_roles i Databasen.
				group: { id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1) },
			};
		}

		this.setState({ moderator }, () => {
			axios
				.put("/rest/member/updateMemberRole", this.state.moderator)
				.then((response) => {
					alert(response.data);
					window.location.reload();
				})
		});
	}

	deleteMember() {
		let id = this.state.user.id; //id = member id, alltså id från Member entitet
		console.log("this.state.user.id", this.state.user.id)
		axios.delete("/rest/member/deleteMember/" + id)
			.then(
				console.log("member with username", this.state.user.username, "deleted"))
	}

	handleReport(showReportPopup) {
		showReportPopup({ targetType: reportType, targetId: this.state.user.user_id });
	}

	render() {
		return (
			<ReportContext.Consumer>{(context => {
				const { showReportPopup } = context;
				const loggedInUser = this.context.loggedInUser;
				return (
					<div className="user-drop">
						{CheckUser(this.state.user)}

						<div className="user-drop-content">
							{CheckYourrole(this.state.user, this.state.loggedInUser, this.updateMemberRole, this.deleteMember, this.handleReport, this.handleClick, showReportPopup, this.context.loggedInUser)}
						</div>
					</div>
				);
			})}
			</ReportContext.Consumer>
		);
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

function CheckYourrole(user, loggedInUser /*<- detta är en member, inte en user.*/, updateMemberRole, deleteMember, handleReport, handleClick, showReportPopup, realLoggedInUser) {
	let dropdownOptions;
	if (
		loggedInUser.role === "GROUPADMIN" &&
		user.role !== "GROUPMODERATOR" &&
		user.role !== "GROUPADMIN"
	) {
		console.log(user.id)
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + user.id}
					onClick={(e) => handleClick(e)}>
					Go to profile
				</button>

				<button
					onClick={() => updateMemberRole()}>
					Make moderator
				</button>

				<button
					onClick={() => deleteMember()}>
					Remove from group
				</button>
				
				<button href={"/group/ban/" + user.id} onClick={(e) => handleClick(e)}>
					Blacklist
				</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else if (
		loggedInUser.role === "GROUPADMIN" &&
		user.role === "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + user.id}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>
				<button
					onClick={() => updateMemberRole()}
				>
					Remove Moderator
				</button>
				<button
					onClick={() => deleteMember()}
				>
					Remove from group
				</button>
				<button href={"/group/ban/" + user.id} onClick={(e) => handleClick(e)}>
					Blacklist
				</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else if (
		loggedInUser.role === "GROUPMODERATOR" &&
		user.role !== "GROUPADMIN" &&
		user.role !== "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + user.id}
					onClick={(e) => handleClick(e)}
				>
					Go to profile
				</button>
				<button

					onClick={() => deleteMember()}
				>
					Remove from group
				</button>
				<button href={"/group/ban/" + user.id} onClick={(e) => handleClick(e)}>
					Blacklist
				</button>
				{ReportButton(realLoggedInUser, handleReport, showReportPopup, user)}
			</>
		);
	} else {
		dropdownOptions = (
			<>
				<button
					href={"/user/profile/" + user.id}
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

function ReportButton(realLoggedInUser, handleReport, showReportPopup, targetMember) {

	if (realLoggedInUser == null) {
		return;
	}

	let isTargetLoggedInUser = realLoggedInUser.id === targetMember.user_id;

	if (realLoggedInUser !== null && !isTargetLoggedInUser) {
		return (
			<button onClick={(e) => handleReport(showReportPopup)}>
				Report
			</button>
		);
	}
}

export default UserDropdown;
