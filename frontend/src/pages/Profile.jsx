import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import '../components/ReportPopup.scss';
import ReportList from '../components/ReportList';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userObj: props.userObj,
			userId: props.userObj.id,
			groups: []
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
		.get("/rest/member/getActiveDataByUserId/" + this.state.userId)
			.then((response) => response.data)
			.then((data) => {
				this.setState({ groups: data });
			});
	}

	deleteGroup(id){
        let groupId = id;
        axios
        .put("/rest/groups/deleteGroup/" + id)
        console.log("Group with id",id ,"has been deleted")

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
				<div> Welcome to profile </div>
				<Link to="/registerGroup">
					<button>Skapa grupp</button>
				</Link>
				{this.checkIfSignedId(this.state.userId)}
				<button onClick={this.logOut}>Logga ut</button>

				{RenderGroups(this.state.groupsList, this.state.userObj.id)}

				<div>{this.state.groups.map((group) => (
					<ul key={group.id}>
						<li> Title: <span>{group.group.title}</span> <br />
							Description: <span>{group.group.description}</span> <br />
							Role: <span>{group.memberRole.title}</span> <br />
							<button onClick={() => this.deleteGroup(group.group.id)}>Radera grupp</button>
						</li>
					</ul>
				))}</div>

				<ReportList />
			</div>
		);
	}
}



function RenderGroups(props, user_id) {
	console.log(props)
	if (typeof props !== "undefined") {
		function leaveGroup(key) {
			axios.delete(
				"/rest/member/delete/" + key + "/" + user_id
			).then((response) => {
				console.log(response.data)
				//window.location.reload()
			})
		}
		let groups = Object.values(props);
		
		let groupList = [];
		for (let i = 0; i < groups.length; i++) {
			groupList.push(
				<div key={i} className="profile-groups-list">
					<div><Link to={`/group/${groups[i].group.id}`}><span>{groups[i].group.title}</span></Link> <br />
							Description: <span>{groups[i].group.description}</span> <br />
							Role: <span>{groups[i].memberRole.title}</span> <br />
							</div>
					<button
						onClick={() => {
							leaveGroup(groups[i].group.id);
						}}
					>
						Leave Group
					</button>
				</div>
			);
		}  
		return groupList; 
    }    
}

export default Profile;
