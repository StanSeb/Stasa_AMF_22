import axios from "axios";
import React, { useState } from 'react'

class UserDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			moderator: {
				user: {id:""},
				memberRole:{id:""},
				group:{id:""},
				}, 
			user: this.props.user,
			loggedInUser: this.props.loggedInUser,
		};
	}

	makeModerator(){
		let moderator= {
			user: {id: 1}, //this.props.user.id
			memberRole:{id: 3}, // id av "moderator" i Tabellen member_roles i Databasen.
			group:{id: 1}, // window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
		};
		this.setState({ moderator }, () => {
			axios
				.post("/rest/member/setModerator", this.state.moderator)
				.then((response) =>{
				alert(response.data);
				window.location.reload();
			})
		});
	}

	handleClick(event) {
		let buttonClicked = event.target.innerText;
		console.log(buttonClicked + ", " + this.state.user.username);
	}

	render() {
		return (
			<>
				<div className="user-drop">
					{CheckUser(this.state.user)}
					<div className="user-drop-content">
						{CheckYourPrivilege(this.state.user, this.state.loggedInUser)}
					</div>
				</div>
			</>
		);
	}
}

function CheckUser(props) {
	let button;
	if (props.privilege === "GROUPADMIN") {
		button = (
			<button className="user-drop-button" id="group-admin">
				{props.username}
			</button>
		);
	} else if (props.privilege === "GROUPMODERATOR") {
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

function CheckYourPrivilege(user, loggedInUser) {
	let dropdownOptions;
	if (
		loggedInUser.privilege === "GROUPADMIN" &&
		user.privilege !== "GROUPMODERATOR" &&
		user.privilege !== "GROUPADMIN"
	) {
		dropdownOptions = (
			<>
				<a
					href={"/user/profile/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Go to profile
				</a>
				<a
					onClick={() => this.makeModerator()} 
				>
					Make Moderator
				</a>
				<a
					href={"/group/remove/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Remove from group
				</a>
				<a href={"/group/ban/" + user.id} onClick={(e) => this.handleClick(e)}>
					Blacklist
				</a>
			</>
		);
	} else if (
		loggedInUser.privilege === "GROUPADMIN" &&
		user.privilege === "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<a
					href={"/user/profile/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Go to profile
				</a>
				<a
					href={"/group/removeModerator/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Remove Moderator
				</a>
				<a
					href={"/group/remove/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Remove from group
				</a>
				<a href={"/group/ban/" + user.id} onClick={(e) => this.handleClick(e)}>
					Blacklist
				</a>
			</>
		);
	} else if (
		loggedInUser.privilege === "GROUPMODERATOR" &&
		user.privilege !== "GROUPADMIN" &&
		user.privilege !== "GROUPMODERATOR"
	) {
		dropdownOptions = (
			<>
				<a
					href={"/user/profile/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Go to profile
				</a>
				<a
					href={"/group/remove/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Remove from group
				</a>
				<a href={"/group/ban/" + user.id} onClick={(e) => this.handleClick(e)}>
					Blacklist
				</a>
			</>
		);
	} else {
		dropdownOptions = (
			<>
				<a
					href={"/user/profile/" + user.id}
					onClick={(e) => this.handleClick(e)}
				>
					Go to profile
				</a>
			</>
		);
	}
	return dropdownOptions;
}

export default UserDropdown;
