import axios from "axios";
import React from "react";
import ThreadCard from "../components/ThreadCard";
import UserDropdown from "../components/UserDropdown";
import CommentCard from "../components/CommentCard";

class ThreadPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.loggedInUser,
			thread: {},
			comments: {
				comment01: {
					id: 1,
					content: "Detta är en kommentar om James Bond",
					creatorId: 1,
				},
				comment02: {
					id: 2,
					content: "Detta är en annan kommentar om James Bond",
					creatorId: 1,
				},
				comment03: {
					id: 3,
					content: "Detta är ytterligare en kommentar om James Bond",
					creatorId: 1,
				},
			},
		};
	}

	componentDidMount() {
		console.log(this.props.threadId)
		let thread;
		axios
			.get("http://localhost:8080/rest/threads/byId/" + this.props.threadId)
			.then((response) => response.data)
			.then((data) => {
				thread = data;
				this.setState({ thread });
			});
	}

	render() {
		return (
			<>
					<div className="group-posts-and-comments">
						<div className="group-posts">
							{RenderThreads(this.state.thread)}
						</div>
						<div className="group-comments">
							{RenderComments(this.state.comments)}
						</div>
					</div>
			</>
		);
	}
}

function RenderThreads(props) {
	if (Object.keys(props).length > 0) {
		return <ThreadCard thread={props} />;
	} else return null;
}

function RenderComments(props, loggedInUser) {
	let comments = Object.values(props);
	let commentList = [];
	for (let i = 0; i < comments.length; i++) {
		commentList.push(
			<CommentCard comment={comments[i]} key={i} loggedInUser={loggedInUser} />
		);
	}
	return commentList;
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

export default ThreadPage;
