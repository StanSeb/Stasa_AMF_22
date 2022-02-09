import axios from "axios";
import React from "react";
import ThreadCard from "../components/ThreadCard";
import UserDropdown from "../components/UserDropdown";
import CommentCard from "../components/CommentCard";
import NewComment from "../components/NewComment";

class ThreadPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedInUser: this.props.loggedInUser,
			thread: {},
			comments: {},
			showNewComment: false,
		};
		this.toggleComment = this.toggleComment.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
	}

	toggleComment(value) {
		this.setState({ showNewComment: value });
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
		this.fetchComments();
	}
	fetchComments() {
		let comments;
		axios
			.get("/rest/threads/commentsForThread/" + this.props.threadId)
			.then(response => {
				comments = response.data;
				this.setState({ comments });
			})
	}

	render() {
		return (
			<>
				<div className="group-posts-and-comments">
					<div className="group-posts">
						{RenderThreads(this.state.thread, this.toggleComment, this.props.loggedInUser, this.props.fetchThreads)}
					</div>
					<div className="group-newComment" style={{ display: this.state.showNewComment ? 'block' : 'none' }}><NewComment fetchComments={this.fetchComments} toggleComment={this.toggleComment} threadId={this.props.threadId} userId={this.props.loggedInUser.id} /></div>
					<div className="group-comments">
						{RenderComments(this.state.comments,this.props.loggedInUser,this.fetchComments)}
					</div>
				</div>
			</>
		);
	}
}

function RenderThreads(props, toggleComment, loggedInUser, fetchThreads) {
	if (Object.keys(props).length > 0) {
		return <ThreadCard thread={props} loggedInUser={loggedInUser} fetchThreads={fetchThreads}showCommentButton={props} toggleComment={toggleComment} />;
	} else return null;
}

function RenderComments(props, loggedInUser, fetchComments) {
	let comments = Object.values(props);
	let commentList = [];
	for (let i = 0; i < comments.length; i++) {
		commentList.push(
			<CommentCard comment={comments[i]} key={i} loggedInUser={loggedInUser} fetchComments={fetchComments} />
		);
	}
	return commentList.reverse();
}

export default ThreadPage;
