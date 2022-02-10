import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";
import NewThread from "../components/NewThread";
import ReportButton from "../components/ReportButton";

const targetType = 3;

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			member: {
				user: { id: "" },
				memberRole: { id: "" },
				group: { id: "" },
			},
			group: { name: "", info: "" },
			loggedInUser: this.props.loggedInUser,
			threads: {},
			users: {},
			clickedThread: 0,
			toggleNewThread: false,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
		this.toggleNewThread = this.toggleNewThread.bind(this);
		this.fetchThreads = this.fetchThreads.bind(this);
	}

	createMember() {
		let member = {
			user: { id: this.state.loggedInUser.id },
			memberRole: { id: 4 }, // id av "user" i Tabellen member_roles i Databasen.
			group: {
				id: window.location.href.substring(
					window.location.href.lastIndexOf("/") + 1
				),
			},
		};

		this.setState({ member }, () => {
			axios.post("/rest/member/join", this.state.member).then((response) => {
				alert(response.data);
				window.location.reload();
			});
		});
	}

	componentDidMount() {
		let groupId = window.location.href.substring(
			window.location.href.lastIndexOf("/") + 1
		);
		this.setState((prevState) => {
			let group = prevState.group;
			group.id = window.location.href.substring(
				window.location.href.lastIndexOf("/") + 1
			);
			return { group };
		});

		let privilege;
		let loggedInUser;
		axios
			.get(
				"/rest/groups/getUserRole/" + groupId + "/" + this.state.loggedInUser.id
			)
			.then((response) => {
				privilege = response.data;

				this.setState(
					{
						loggedInUser: {
							username: this.state.loggedInUser.username,
							id: this.state.loggedInUser.id,
							privilege: privilege,
						},
					},
					() => {
						this.fetchThreads();
					}
				);
			});

		axios.get("/rest/groups/getById/" + groupId) // hämta grupp
			.then((response)=> {
				// console.log(response.data)
				this.setState({group:response.data})
			});

        // axios.get("/rest/member/memberByGroupId/" + groupId)  // hämta gruppmedlem
		// 	.then((response) => response.data)
		// 	.then((data) => {
		// 		this.setState({users: data});
     	// 	});

		let users;
		axios.get("/rest/member/memberByGroupId/" + groupId) 
			.then((response) => response.data)
			.then((data) =>{
				users = data;
		 		this.setState({users});
	 		}
		);	

		let threads;
		axios
			.get("/rest/member/memberByGroupId/" + groupId)
			.then((response) => response.data)
			.then((data) => {
				users = data;
				this.setState({ users });
			});
	}
	toggleNewThread(value) {
		this.setState({ toggleNewThread: value });
		if (value) {
			document.querySelector("html").style.overflow = "hidden";
		} else {
			document.querySelector("html").style.overflow = "auto";
		}
	}

	handleThreadClick(props) {
		let clickedThread = props.id;
		this.setState({ clickedThread });
	}

	fetchThreads() {
		if (typeof this.state.loggedInUser.privilege !== "undefined" && this.state.loggedInUser.privilege !== '') {
			let threads;
			axios
				.get("/rest/threads/byGroup/" + this.state.group.id)
				.then((response) => response.data)
				.then((data) => {
					threads = data;
					this.setState({ threads });
					console.log(threads);
				});
		}
	}

	render() {
		return (
			<>
				<div className="group-page">
					<div
						className="group-overlay"
						style={{ display: this.state.toggleNewThread ? "block" : "none" }}
					>
						<NewThread
							cancelPost={this.toggleNewThread}
							groupId={this.state.group.id}
							loggedInUser={this.state.loggedInUser}
							fetchThreads={this.fetchThreads}
						/>
					</div>
					<>
						<div className="group-posts">´
							{ShowThread(
								this.state.threads,
								this.handleThreadClick,
								this.state.clickedThread,
								this.props.loggedInUser,
								this.fetchThreads
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
						<button
							className="group-new-thread"
							style={{
								display:
									typeof this.state.loggedInUser.privilege === "undefined" ? "none" : this.state.loggedInUser.privilege === ''
										? "none"
										: "block",
							}}
							onClick={() => this.toggleNewThread(true)}
						>
							Skapa nytt inlägg
						</button>
						<ReportButton customText="Report this group" targetType={ targetType } targetId={window.location.href.substring(window.location.href.lastIndexOf("/") + 1) } />
					</div>
				</div>
			</>
		);
	}
}

function ShowThread(
	threads,
	handleThreadClick,
	clickedThread,
	loggedInUser,
	fetchThreads
) {
	if (clickedThread === 0) {
		return (
			<>
				{RenderThreads(threads, handleThreadClick, loggedInUser, fetchThreads)}
			</>
		);
	} else {
		return (
			<ThreadPage
				threadId={clickedThread}
				loggedInUser={loggedInUser}
				showCommentButton={true}
				fetchThreads={fetchThreads}
			/>
		);
	}
}

function RenderThreads(props, handleThreadClick, loggedInUser, fetchThreads) {
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
					fetchThreads={fetchThreads}
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
