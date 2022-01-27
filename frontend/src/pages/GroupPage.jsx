import React from "react";
import ThreadCard from "../components/ThreadCard";
import UserDropdown from "../components/UserDropdown";

class GroupPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      group: this.props.group,
      loggedInUser: this.props.loggedInUser,
			threads: {
				thread01: {
					id: 1,
					title: "Har ni sett den nya James Bond?",
					username: "Leif Bond",
					content: "Jag tycker att den är mycket?? FIN!",
				},
				thread02: {
					id: 2,
					title: "Har ni sett den nya Bames Jond?",
					username: "Leificus Bondicus",
					content: "Jag tycker att den är mycket!? FIN!",
				},
				thread03: {
					id: 3,
					title: "Har ni sett den nya Fames Lond?",
					username: "Dr. Leffe Bond",
					content: "Jag tycker att den är mycket?! FIN!",
				},
				thread04: {
					id: 4,
					title: "Har ni sett den nya Tames Mond?",
					username: "Laif Bendelius",
					content: "Jag tycker att den är mycket!! FIN!",
				},
			},
			users: {
				user01: { id: 1, username: "Leif Bond", privilege: "admin" },
        user02: { id: 2, username: "Leificus Bondicus", privilege: "moderator" },
				user03: { id: 3, username: "Dr. Leffe Bond", privilege: "moderator" },
				user04: { id: 4, username: "Agent Lars Schmidt" },
				user05: { id: 5, username: "Laif Bendelius" },
				user06: { id: 6, username: "Leif Bond" },
				user07: { id: 7, username: "Leificus Bondicus" },
				user08: { id: 8, username: "Dr. Leffe Bond" },
				user09: { id: 9, username: "Agent Lars Schmidt" },
			},
		};
	}

	render() {
		return (
			<>
				<div className="group-page">
					<div className="group-posts">{RenderThreads(this.state.threads)}</div>
					<div className="group-side-panel">
						<div className="group-info">
							<h3>{this.props.group.name}</h3>
							<p>{this.props.group.info}</p>
							<p>Admin: {this.props.group.admin}</p>
						</div>
						<div className="group-members">{RenderUsers(this.state.users, this.state.loggedInUser)}</div>
					</div>
				</div>
			</>
		);
	}
}

function RenderThreads(props) {
	let threads = Object.values(props);
	let threadList = [];
	for (let i = 0; i < threads.length; i++) {
		threadList.push(<ThreadCard thread={threads[i]} key={i} />);
	}
	return threadList;
}

function RenderUsers(props, loggedInUser) {
	let users = Object.values(props);
	let usersList = [];
	for (let i = 0; i < users.length; i++) {
    usersList.push(<UserDropdown user={users[i]} key={i} loggedInUser={loggedInUser}/>);
	}
	return usersList;
}

export default GroupPage;
