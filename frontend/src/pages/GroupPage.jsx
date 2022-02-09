import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			member: {
				user: {id:""},
				memberRole:{id:""},
				group:{id:""},
				},       
			group: {name:"",info:""},
			loggedInUser: this.props.loggedInUser,
			threads: {},
			users: {},
			usersBlacklist: [],
			clickedThread: 0,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
	}

	createMember(){
		let member= {
			user: {id: this.state.loggedInUser.id},
			memberRole:{id: 4}, // id av "user" i Tabellen member_roles i Databasen.
			group:{id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1)},
		};
	
		this.setState({ member }, () => {
			axios
				.post("/rest/member/join", this.state.member)
				.then((response) =>{
				alert(response.data);
				window.location.reload();
			})
		});
	}

	componentDidMount() {
		let groupId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

		let privilege;
		let loggedInUser;
		 axios
		 	.get("/rest/groups/getUserRole/" + groupId + "/" + this.state.loggedInUser.id)
		 	.then((response) => {
		 		privilege = response.data;

				this.setState({
					loggedInUser: {
						username: this.state.loggedInUser.username,
						id: this.state.loggedInUser.id,
						privilege: privilege,
					},
				}, () => {console.log(this.state.loggedInUser)})
		 	})

		axios.get("/rest/groups/getGroupBy/"+groupId)
		.then((response)=> {
			this.setState({group:response.data})
		})
        axios.get("/rest/member/memberByGroupId/" + groupId) 
        .then((response) => response.data)
        .then((data) =>{
         this.setState({users: data});
         console.log(this.state.users);
     });

		let users;
		axios.get("/rest/member/memberByGroupId/" + groupId) 
			.then((response) => response.data)
			.then((data) =>{
				users = data;
		 		this.setState({users});
	 		}
		);	

		let usersBlacklist;
		axios.get("/rest/balcklistByGroupId/" + groupId) 
			.then((response) => response.data)
			.then((data) =>{
				usersBlacklist = data;
		 		this.setState({usersBlacklist});
	 		}
		);	

		let threads;
		axios
		    .get("/rest/threads/byGroup/"+groupId)
			.then((response) => response.data)
			.then((data) => {
				threads = data;
				this.setState({ threads });
			}
		);		
	}

	handleThreadClick(props) {
		let clickedThread = props.id;
		this.setState({ clickedThread });
	}

	render() {
		return (
			<>
				<div className="group-page">
					<>
						<div className="group-posts">
							{ShowThread(
								this.state.threads,
								this.handleThreadClick,
								this.state.clickedThread,
								this.props.loggedInUser
							)}
						</div>
					</>
					<div className="group-side-panel">
						<div className="group-info">
							<h3>{this.state.group.title}</h3>
							<p>{this.state.group.description}</p>
							<button onClick={() => this.createMember()}>Bli medlem</button>
						</div>
						<div className="group-members">
							{RenderUsers(this.state.users, this.state.loggedInUser)}
						</div>
						<div className="group-members blacklist">
                            <h6 className="blocked-users">Blockerade användare i den här gruppen:</h6> 
                         {/*     {RenderUsersBlacklist(this.state.usersBlacklist, this.state.loggedInUser)}  */}

						 <div className="blacklist-list">{this.state.usersBlacklist.map((blacklist) => (
							<ul className="blacklist-ul" key={blacklist.id}>
								<li className="blacklist-members"> 
									<button>Aktivera</button>
									<span className="blacklist-user">{blacklist.username}</span> -
									<span className="blacklist-date">( {blacklist.to_date})</span> 
								</li>
							</ul>
						))}</div>
                        </div>
					</div>
				</div>
			</>
		);
	}
}

function ShowThread(threads, handleThreadClick, clickedThread, loggedInUser) {
	if (clickedThread === 0) {
		return <>{RenderThreads(threads, handleThreadClick, loggedInUser)}</>;
	} else {
		return <ThreadPage threadId={clickedThread} loggedInUser={loggedInUser} showCommentButton={true} />;
	}
}

function RenderThreads(props, handleThreadClick, loggedInUser) {
	if (props !== null) {
		let threads = Object.values(props);
		let threadList = [];
		for (let i = threads.length - 1; i >= 0; i--) {
			threadList.push(
				<ThreadCard
					thread={threads[i]}
					key={i}
					handleThreadClick={(e) => handleThreadClick(e)}
					loggedInUser={loggedInUser}
					showCommentButton={false}
				/>
			);
		}
		return threadList;
	} else return null;
}

function RenderUsers(props, loggedInUser) {
	let users = Object.values(props);
	let usersList = [];
	for (let i = 0; i < users.length; i++) {
		usersList.push(
			<UserDropdown user={users[i]} key={i} loggedInUser={loggedInUser} />
		);
	}
	return usersList;
}

/*
function RenderUsersBlacklist(props, loggedInUser) {
	let usersBlacklist = Object.values(props);
	let usersList = [];
	for (let i = 0; i < usersBlacklist.length; i++) {
		usersList.push(
			<UserDropdown user={usersBlacklist[i]} key={i} loggedInUser={loggedInUser} />
		);
	}
	return usersList;
}
*/

export default GroupPage;
