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
			comments: {},
		};
	}

	componentDidMount() {
		let thread;
		axios
			.get("/rest/threads/byId/" + this.props.threadId)
			.then((response) => response.data)
			.then((data) => {
				thread = data;
				this.setState({ thread });
			});

		//Avkommentera när det börjar bli dags att hämta kommentarer
		// let comments;
		// axios
		// 	.get("http://localhost:8080/rest/comments/byThread/1")
		// 	.then((response) => response.data)
		// 	.then((data) => {
		// 		comments = data;
		// 		this.setState({ comments });
		// 	});
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

export default ThreadPage;
