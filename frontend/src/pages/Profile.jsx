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
			blockedGroups: [],
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
		window.location.assign("http://localhost:3000/home");
	}

	async componentDidMount() {
		axios
			.get("/rest/member/getMembersByUserId/" + this.state.userId)
			.then((response) => response.data)
			.then((data) => {
				this.setState({ groups: data });
			});
		
		let blockedGroups;
		axios
			.get("/rest/member/blockedGroups/" + this.state.userId)
			.then((response) => response.data)
			.then((data) => {
				blockedGroups = data;
				this.setState({ blockedGroups });
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
		return (
			<div className="profileContainer">
				<h2> Welcome to profile </h2>
				<div>
					{CheckBlockedGroupsList( this.state.blockedGroups)}
				</div>
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
							Role: <span>{group.memberRole.title}</span> <br />
						</li>
					</ul>
				))}</div>
			</div>
		);
	}
}

function CheckBlockedGroupsList(blockedGroups){
	let div;
	if (blockedGroups.length > 0) {
		div = (
			<div className="group-members-blacklist">
                <h4 className="blocked-users">Du har blivit blockerad i följande grupp:</h4> 
				 <div className="blacklist-list">{blockedGroups.map((blockedGroups) => (
					<ul className="blacklist-ul" key={blockedGroups.id}>
						<li className="blacklist-groups"> 
							<span className="blacklist-user"> Grupp: {blockedGroups.title} </span>
							<span className="blacklist-date">(Från: {blockedGroups.to_date} -</span> 
							<span className="blacklist-date">Till: {blockedGroups.from_date})</span> 
						</li>
					</ul>
				))}</div>
			</div>	
		);
	} else{
		div = (<di></di>);
	}
	return div;
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
