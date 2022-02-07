import React from "react";
import { useNavigate } from "react-router-dom";

class CommentCart extends React.Component {
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
				<div className="comment-social-buttons">

				</div>
			</div>
		);
	}
}

function returnComments(comment) {
	if (typeof (comment) == "string") {
		let username = comment.substring((comment + ("")).lastIndexOf(',') + 1)
		let content = comment.split("," + username)[0]
		return <> <span>{content}</span> / <span>{username}</span></>
	}

	console.log(typeof (comment) == "string")
	return <></>
}

export default CommentCart;
