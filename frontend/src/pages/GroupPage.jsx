import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			group: this.props.group,
			loggedInUser: this.props.loggedInUser,
			threads: {},
			users: {},
			clickedThread: 0,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
	}

	componentDidMount() {
		let threads;
		axios
			.get("/rest/threads/byGroup/7")
			.then((response) => response.data)
			.then((data) => {
				threads = data;
				this.setState({ threads });
			});

		let privilege;
		let loggedInUser;
		axios
			.get(
				"/rest/getUserRole/" +
					this.state.group.id +
					"/" +
					this.state.loggedInUser.id
			)
			.then((response) => {
				privilege = response.data;
			})
			.then(
				this.setState({
					loggedInUser: {
						username: this.state.loggedInUser.username,
						id: this.state.loggedInUser.id,
						privilege: privilege,
					},
				}, () => {console.log(this.state.loggedInUser)})
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
								this.state.clickedThread, // parent som behövs för handleThreadClick
								// 			Frågar du är du tönt
								this.props.loggedInUser
							)}
						</div>
					</>
					<div className="group-side-panel">
						<div className="group-info">
							<h3>{this.props.group.name}</h3>
							<p>{this.props.group.info}</p>
							<p>Admin: {this.props.group.admin}</p>
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
		return <ThreadPage threadId={clickedThread} loggedInUser={loggedInUser} />;
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
