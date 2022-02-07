import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
			group: {name:"",info:""},
			loggedInUser: this.props.loggedInUser,
			threads: {},
			users: {
				user01: { id: 1, username: "Leif Bond", privilege: "admin" },
				user02: {
					id: 2,
					username: "Leificus Bondicus",
					privilege: "moderator",
				},
				user03: { id: 3, username: "Dr. Leffe Bond", privilege: "moderator" },
				user04: { id: 4, username: "Agent Lars Schmidt" },
				user05: { id: 5, username: "Laif Bendelius" },
				user06: { id: 6, username: "Leif Bond" },
				user07: { id: 7, username: "Leificus Bondicus" },
				user08: { id: 8, username: "Dr. Leffe Bond" },
				user09: { id: 9, username: "Agent Lars Schmidt" },
			},
			clickedThread: 0,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
	}

	componentDidMount() {
		let groupId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

		axios.get("/rest/groups/getGroupBy/"+groupId)
		.then((response)=> {
			console.log(response.data)
			this.setState({group:response.data})
		})
        axios.get("/rest/member/memberByGroupId/" + groupId) 
        .then((response) => response.data)
        .then((data) =>{
         this.setState({users: data});
         console.log(this.state.users);
     });

		let threads;
		axios
			.get("http://localhost:8080/rest/threads/byGroup/"+groupId)
			.then((response) => response.data)
			.then((data) => {
				threads = data;
				this.setState({ threads });
			});

		let privilege;
		let loggedInUser;
		// axios
		// 	.get(
		// 		"http://localhost:8080/rest/getUserRole/" +
		// 			this.state.group.id +
		// 			"/" +
		// 			this.state.loggedInUser.id
		// 	)
		// 	.then((response) => {
		// 		privilege = response.data;
		// 	})
		// 	.then(
		// 		this.setState({
		// 			loggedInUser: {
		// 				username: this.state.loggedInUser.username,
		// 				id: this.state.loggedInUser.id,
		// 				privilege: privilege,
		// 			},
		// 		}, () => {console.log(this.state.loggedInUser)})
		// 	);
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
						</div>
						<div className="group-members">
							{RenderUsers(this.state.users, this.state.loggedInUser)}
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

export default GroupPage;
