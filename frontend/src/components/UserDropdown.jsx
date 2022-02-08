import React from "react";
import axios from 'axios'

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
		this.updateMemberRole= this.updateMemberRole.bind(this);
		this.deleteMember=this.deleteMember.bind(this);
	}

	handleClick(event) {
		let buttonClicked = event.target.innerText;
		console.log(buttonClicked + ", " + this.state.user.username);
		console.log(this.state.user.id)
		
	}

	updateMemberRole(){
		let moderator;

		if(this.props.user.privilege == "MEMBER"){
			moderator= {
				user: {id: this.props.user.id}, 
				memberRole:{id: 3}, // id av "moderator" i Tabellen member_roles i Databasen.
				group:{id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}, 
			};
		}else if(this.props.user.privilege == "GROUPMODERATOR"){
			moderator= {
				user: {id: this.props.user.id}, 
				memberRole:{id: 4}, // id av "member" i Tabellen member_roles i Databasen.
				group:{id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)}, 
			};
		}
		
		this.setState({ moderator }, () => {
			axios
				.put("/rest/member/updateMemberRole", this.state.moderator)
				.then((response) =>{
				alert(response.data);
				window.location.reload();
			})
		});
	}

	deleteMember(){
		let id = this.state.user.id; //id = member id, alltså id från Member entitet
		console.log("this.state.user.id" , this.state.user.id)
		axios.delete("/rest/member/deleteMember/" + id)
		.then(
			console.log("member with username",this.state.user.username , "deleted"))
	}

	render() {
		return (
			<>
				<div className="user-drop">
					{CheckUser(this.state.user)}
					<div className="user-drop-content">
						{CheckYourPrivilege(this.state.user, this.state.loggedInUser, this.updateMemberRole,this.deleteMember)}
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

function CheckYourPrivilege(user, loggedInUser, updateMemberRole,handleClick,deleteMember) {
	let dropdownOptions;
	if (
		loggedInUser.privilege === "GROUPADMIN" &&
		user.privilege !== "GROUPMODERATOR" &&
		user.privilege !== "GROUPADMIN"
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
					Make moderator
				</button>
				<button
					onClick={() => deleteMember()}
				>
					Remove from group
				</button>
				<button href={"/group/ban/" + user.id} onClick={(e) => handleClick(e)}>
					Blacklist
				</button>
			</>
		);
	} else if (
		loggedInUser.privilege === "GROUPADMIN" &&
		user.privilege === "GROUPMODERATOR"
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
			</>
		);
	} else if (
		loggedInUser.privilege === "GROUPMODERATOR" &&
		user.privilege !== "GROUPADMIN" &&
		user.privilege !== "GROUPMODERATOR"
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
			</>
		);
	}
	return dropdownOptions;
}

export default UserDropdown;
