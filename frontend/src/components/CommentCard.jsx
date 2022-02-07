import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

class CommentCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
		};
	}

	componentDidMount() {
		this.setState({
			comment: {
				id: this.props.comment[0],
				content: this.props.comment[1],
				creatorId: this.props.comment[2],
				username: this.props.comment[3],
			},
		});
	}

	render() {
		return (
			<div className="comment-card">
				{returnComments(this.state.comment)}
				{DeleteButton(
					this.state.comment,
					this.props.loggedInUser,
					this.props.fetchComments
				)}
				<div className="comment-social-buttons"></div>
			</div>
		);
	}
}

function returnComments(comment) {
	return (
		<>
			<span>{comment.content}</span> / <span>{comment.username}</span>
		</>
	);
}

function DeleteButton(comment, loggedInUser, fetchComments) {
	if (
		comment.creatorId === loggedInUser.id ||
		loggedInUser.privilege === "admin" ||
		loggedInUser.privilege === "moderator"
	) {
		function handleClick() {
			if (window.confirm("Are you sure you want to delete this")) {
				axios
					.put("http://localhost:8080/rest/threads/deleteComment/" + comment.id)
					.then((response) => {
						fetchComments();
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		return <button onClick={() => handleClick()}>Ta bort</button>;
	} else {
		return <></>;
	}
}

export default CommentCard;
