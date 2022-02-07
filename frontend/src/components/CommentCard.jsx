import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

class CommentCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: ""
		};
	}
	render() {
		return (
			<div className="comment-card">
				{returnComments(this.props.comment)}
				{DeleteButton(this.props.comment, this.props.loggedInUser,this.props.fetchComments)}
				<div className="comment-social-buttons">
				</div>
			</div>
		);
	}
}

function returnComments(comment) {
	if (typeof (comment) == "string") {
		let creatorId = comment.substring((comment + ("")).lastIndexOf(',') + 1)
		let commentWithoutId = comment.split("," + creatorId)[0]
		let id = commentWithoutId.substring((commentWithoutId + ("")).lastIndexOf(',') + 1)
		commentWithoutId = comment.split("," + id)[0]
		let username = commentWithoutId.substring((commentWithoutId + ("")).lastIndexOf(',') + 1)
		let content = commentWithoutId.split("," + username)[0]
		return <> <span>{content}</span> / <span>{username}</span></>
	}

	return <></>
}
function DeleteButton(comment, loggedInUser,fetchComments) {
	let creatorId = parseInt(comment.substring((comment + ("")).lastIndexOf(',') + 1))
	let commentWithoutId = comment.split("," + creatorId)[0]
	let id = parseInt(commentWithoutId.substring((commentWithoutId + ("")).lastIndexOf(',') + 1))


	if (
		creatorId === loggedInUser.id ||
		loggedInUser.privilege === "admin" ||
		loggedInUser.privilege === "moderator"

	) {
		function handleClick() {
			if (window.confirm("Are you sure you want to delete this")) {
				console.log(creatorId)
				console.log(id)
				axios
					.put("http://localhost:8080/rest/threads/deleteComment/" + id)
					.then((response) => {
						console.log(response);
					fetchComments()
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
