import axios from "axios";
import React from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";
import InviteMemberPopup from "../components/InviteMemberPopup";
import NewThread from "../components/NewThread";
import { Navigate } from "react-router-dom"

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			members: [],
			group: { title: "", description: "" },
			loggedInUser: this.props.loggedInUser,
			loggedInMember: { role: null },
			threads: {},
			clickedThread: 0,
			invitePopup: false,
			toggleNewThread: false,
			isAdmin: false,
			reload: false,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
		this.toggleNewThread = this.toggleNewThread.bind(this);
		this.fetchThreads = this.fetchThreads.bind(this);
		this.reloadPage = this.reloadPage.bind(this);
		this.toggleInviteMember = this.toggleInviteMember.bind(this);
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

	toggleInviteMember() {
		this.setState({ invitePopup: !this.state.invitePopup });
	}
	async componentDidMount() {
		this.checkIfAdmin()

		let groupId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

		//Kör dessa först för att få rätt memberId när en bjuder in till gruppen
		const [firstResponse, secondResponse, thirdResponse] = await Promise.all([
			axios.get("/rest/groups/getGroupBy/" + groupId),
			axios.get("/rest/member/memberByGroupId/" + groupId),
			axios.get("/rest/threads/byGroup/" + groupId)
		]);

		const fourthResponse = await axios.get("/rest/member/getMemberByIdUserId/" + this.state.loggedInUser.id + "/" + firstResponse.data[0].id)
		


		this.setState({
			group: firstResponse.data[0],
			members: secondResponse.data,
			threads: thirdResponse.data,
		})
		this.setState((prevState) => {

			let loggedInMember = prevState.loggedInMember
			console.log(fourthResponse.data.length)
			if(typeof(fourthResponse.data[0] !=="undefined" && fourthResponse.data.length>0)){
				loggedInMember = fourthResponse.data[0]
				console.log(fourthResponse.data[0])
			}
			console.log(loggedInMember)
			return {loggedInMember}
		})
	}
	RenderMembers(props, loggedInMember, isAdmin) {
		let members = Object.values(props);
		let membersList = [];
		for (let i = 0; i < members.length; i++) {
			membersList.push(
				<UserDropdown user={members[i]} key={i} loggedInMember={loggedInMember} isAdmin={isAdmin} />
			);
		}
		return membersList;
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
		if (typeof this.state.loggedInMember.role !== "undefined" && this.state.loggedInMember.role !== '') {
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
	reloadPage() {
		this.setState({ reload: true })
	}

	render() {
		if (this.state.reload) {
			return <Navigate to="/home" />
		} else {
			return (
				<div className="group-page">

					<div className="group-overlay"
						style={{ display: this.state.toggleNewThread ? "block" : "none" }}>
						<NewThread
							cancelPost={this.toggleNewThread}
							groupId={this.state.group.id}
							loggedInUser={this.state.loggedInUser}
							fetchThreads={this.fetchThreads}
						/>
					</div>

					<div className="group-posts">
						{ShowThread(
							this.state.threads,
							this.handleThreadClick,
							this.state.clickedThread,
							this.props.loggedInUser,
							this.fetchThreads
						)}
					</div>

					<div className="group-side-panel">
						{this.state.invitePopup ? <InviteMemberPopup toggleProps={this.toggleInviteMember} loggedInUser={this.state.loggedInUser} groupId={this.state.group} memberId={this.state.members} /> : null}

						<div className="group-info">
							<h3>{this.state.group.title}</h3>
							<p>{this.state.group.description}</p>
							{RemoveGroupButton(this.state.isAdmin, this.state.loggedInMember, this.state.group, this.reloadPage)}
							{/* {MemberButton(this.state.loggedInMember)} */}
						</div>

						<div className="group-members">
							{this.RenderMembers(this.state.members, this.state.loggedInMember, this.state.isAdmin)}
						</div>

						<button
							className="group-new-thread"
							style={{
								display:
									this.state.loggedInMember.role === null ? "none" : "block"
							}}
							onClick={() => this.toggleNewThread(true)}
						>
							Skapa nytt inlägg
						</button>
					</div>
				</div>)
		}
	}
}
function MemberButton(role) {
	console.log(role.role)
	if (typeof (role.role) === "undefined") {
		return <button onClick={() => this.createMember()}>Bli medlem</button>
	}
	else {
		return <button onClick={() => this.toggleInviteMember()}>Bjud in medlem</button>
	}
}
function RemoveGroupButton(isAdmin, group, reloadPage) {

	if (isAdmin) {
		function removeGroup() {

			if (window.confirm('Är du säker på att du vill ta bort denna gruppen: ' + group.title))
				axios
					.put("/rest/groups/deleteGroup/" + group.id)
					.then((response) => {
						alert("Grupp med namnet: " + group.title + " har tagits bort")
						reloadPage()
					})
		}
		return <button className="group-delete" onClick={removeGroup}>Ta bort grupp</button>
	}
	else {
		return <></>
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


export default GroupPage;
