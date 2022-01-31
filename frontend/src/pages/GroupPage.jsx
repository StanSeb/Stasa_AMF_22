import axios from "axios";
import React, {useState} from "react";
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
	}

	componentDidMount() {
		let threads;
		axios
			.get("http://localhost:8080/rest/threads/byGroup/1")
			.then((response) => response.data)
			.then((data) => {
				threads = data;
				this.setState({ threads });
			});
	}

	handleThreadClick(props) {
		let clickedThread = props.id;
		props.parent.setState({ clickedThread });
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
								this // parent som behövs för handleThreadClick
								// 			Frågar du är du tönt
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

function ShowThread(threads, handleThreadClick, clickedThread, parent) {
	if (clickedThread === 0) {
		return <>{RenderThreads(threads, handleThreadClick, parent)}</>;
	} else {
		return <ThreadPage threadId={clickedThread}/>;
	}
}

function RenderThreads(props, handleThreadClick, parent) {
	if (props !== null) {
		let threads = Object.values(props);
		let threadList = [];
		for (let i = 0; i < threads.length; i++) {
			threadList.push(
				<ThreadCard
					thread={threads[i]}
					key={i}
					handleThreadClick={(e) => handleThreadClick(e)
					}
					parent={parent}
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
