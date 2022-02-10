import axios from "axios";
import React, { useState } from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";
import NewThread from "../components/NewThread";
import {Navigate} from "react-router-dom"

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
			isAdmin: false,
			reload:false,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
		this.toggleNewThread = this.toggleNewThread.bind(this);
		this.fetchThreads = this.fetchThreads.bind(this);
		this.reloadPage= this.reloadPage.bind(this);
	}

	checkIfAdmin() {
		if (typeof (this.props.loggedInUser.id) != "undefined") {
			axios.get("/rest/isAdmin/" + this.props.loggedInUser.id)
				.then(response => {
					this.setState({ isAdmin: response.data });
				})
		}
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
		this.checkIfAdmin()
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

		let role;
		let loggedInUser;
		axios
			.get(
				"/rest/groups/getUserRole/" + groupId + "/" + this.state.loggedInUser.id
			)
			.then((response) => {
				role = response.data;

				this.setState(
					{
						loggedInUser: {
							username: this.state.loggedInUser.username,
							id: this.state.loggedInUser.id,
							role: role,
						},
					},
					() => {
						this.fetchThreads();
					}
				);
			});

		axios.get("/rest/groups/getById/" + groupId) // hämta grupp
			.then((response) => {
				// console.log(response.data)
				this.setState({ group: response.data })
			});

		// axios.get("/rest/member/memberByGroupId/" + groupId)  // hämta gruppmedlem
		// 	.then((response) => response.data)
		// 	.then((data) => {
		// 		this.setState({users: data});
		// 	});

		let users;
		axios.get("/rest/member/memberByGroupId/" + groupId)
			.then((response) => response.data)
			.then((data) => {
				users = data;
				this.setState({ users });
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
		if (typeof this.state.loggedInUser.privilege !== "undefined" && this.state.loggedInUser.privilege !== '' || this.state.isAdmin) {
			let threads;
			axios
				.get("/rest/threads/byGroup/" + this.state.group.id)
				.then((response) => response.data)
				.then((data) => {
					threads = data;
					this.setState({ threads });
				});
		}
	}
	reloadPage(){
		this.setState({reload:true})
	}

	render() {
		if(this.state.reload){
			return <Navigate to="/home" />
		}else{

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
						<div className="group-posts">
							{ShowThread(
								this.state.threads,
								this.handleThreadClick,
								this.state.clickedThread,
								this.props.loggedInUser,
								this.fetchThreads,
								this.state.isAdmin
								)}
						</div>
					</>
					
					<div className="group-side-panel">
						<div className="group-info">
							{RemoveGroupButton(this.state.isAdmin,this.state.loggedInUser.role,this.state.group,this.reloadPage)}
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
					</div>
				</div>
			</>
		);
	}
}
}
function RemoveGroupButton(isAdmin, role,group,reloadPage) {
	console.log(group)
	if (isAdmin || role === 'GROUPADMIN') {
		function removeGroup() {
			
			if (window.confirm('Är du säker på att du vill ta bort denna gruppen: ' + group.title))
				axios
					.put("/rest/groups/deleteGroup/" +group.id)
					.then((response) => {
						alert("Grupp med namnet: " + group.title + " har tagits bort")
						reloadPage()
					})
		}
		return <button className="group-delete" onClick={removeGroup}>Ta bort grupp</button>
	}
	else {
		return <>testar else</>
	}

}

function ShowThread(
	threads,
	handleThreadClick,
	clickedThread,
	loggedInUser,
	fetchThreads,
	isAdmin
) {
	if (clickedThread === 0) {
		return (
			<>
				{RenderThreads(threads, handleThreadClick, loggedInUser, fetchThreads, isAdmin)}
			</>
		);
	} else {
		return (
			<ThreadPage
				threadId={clickedThread}
				loggedInUser={loggedInUser}
				showCommentButton={true}
				fetchThreads={fetchThreads}
				isAdmin={isAdmin}
			/>
		);
	}
}

function RenderThreads(props, handleThreadClick, loggedInUser, fetchThreads, isAdmin) {
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
					isAdmin={isAdmin}
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
