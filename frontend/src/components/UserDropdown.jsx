import React from "react";

class UserDropdown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			loggedInUser: this.props.loggedInUser,
		};
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
	if (props.privilege === "admin") {
		button = (
			<button className="user-drop-button" id="group-admin">
				{props.username}
			</button>
		);
	} else if (props.privilege === "moderator") {
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
		loggedInUser.privilege === "admin" &&
		user.privilege !== "moderator" &&
		user.privilege !== "admin"
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
					href={"/group/makeModerator/" + user.id}
					onClick={(e) => this.handleClick(e)}
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
		loggedInUser.privilege === "admin" &&
		user.privilege === "moderator"
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
		loggedInUser.privilege === "moderator" &&
		user.privilege !== "admin" &&
		user.privilege !== "moderator"
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
