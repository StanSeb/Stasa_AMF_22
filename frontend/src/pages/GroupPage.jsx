import axios from "axios";
import React from "react";
import ThreadCard from "../components/ThreadCard";
import ThreadPage from "../pages/ThreadPage";
import UserDropdown from "../components/UserDropdown";
import InviteMemberPopup from "../components/InviteMemberPopup";

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			member: {
				user: { id: "" },
				memberRole: { id: "" },
				group: { id: "" },
			},
			group: {},
			loggedInUser: this.props.loggedInUser.id,
			threads: {},
			users: {},
			clickedThread: 0,
			invitePopup: false,
		};
		this.handleThreadClick = this.handleThreadClick.bind(this);
	}

	createMember() {
		let member = {
			user: { id: this.state.loggedInUser.id },
			memberRole: { id: 4 }, // id av "user" i Tabellen mamber_roles i Databasen.
			group: { id: window.location.href.substring(window.location.href.lastIndexOf('/') + 1) },
		};

		this.setState({ member }, () => {
			axios
				.post("/rest/member/join", this.state.member)
				.then((response) => {
					alert(response.data);
					window.location.reload();
				})
		});
	}

	toggleInviteMember() {
		this.setState({ invitePopup: !this.state.invitePopup });
	}

	async componentDidMount() {
		let groupId = window.location.href.substring(window.location.href.lastIndexOf('/') + 1)

		//Kör dessa först för att få rätt memberId när en bjuder in till gruppen
		const firstResponse = await Promise.all([
			axios.get("/rest/groups/getGroupBy/" + groupId),
			axios.get("/rest/member/memberByGroupId/" + groupId),
			axios.get("/rest/threads/byGroup/" + groupId)
		]);

		const secondResponse = await axios.get("/rest/member/getMemberByIdUserId/" + this.state.loggedInUser + "/" + firstResponse[0].data.id)

		this.setState({
			group: firstResponse[0].data,
			users: firstResponse[1].data,
			threads: firstResponse[2].data
		})		
	}

	handleThreadClick(props) {
		let clickedThread = props.id;
		this.setState({ clickedThread });
	}

	render() {
		return (
			<div className="group-page">
				{this.state.invitePopup ? <InviteMemberPopup groupAdmin={this.state.loggedInUser} groupId={this.state.group.id} /> : null}
				<div className="group-posts">
					{ShowThread(
						this.state.threads,
						this.handleThreadClick,
						this.state.clickedThread, // parent som behövs för handleThreadClick
						this.props.loggedInUser
					)}
				</div>
				<div className="group-side-panel">
					<div className="group-info">
						<h3>{this.state.group.title}</h3>
						<p>{this.state.group.description}</p>
						<button onClick={() => this.createMember()}>Bli medlem</button>
						<button onClick={() => this.toggleInviteMember()}>Bjud in medlem</button>
					</div>
					<div className="group-members">
						{RenderUsers(this.state.users, this.state.loggedInUser)}

					</div>
				</div>
			</div>
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
