import React from "react";

class CommentCart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="comment-card">
				<span>{this.props.comment.content}</span>
				<div className="comment-social-buttons">
					<a
						href={"/thread/comment/" + this.props.comment.id}
						onClick={(e) => this.handleClick(e.target)}
						className="thread-button"
					>
						Comment
					</a>
					<a
						href={"/thread/like/" + this.props.comment.id}
						onClick={(e) => this.handleClick(e.target)}
						className="thread-button"
					>
						Like
					</a>
					<a
						href={"/thread/dislike/" + this.props.comment.id}
						onClick={(e) => this.handleClick(e.target)}
						className="thread-button"
					>
						Dislike
					</a>
				</div>
			</div>
		);
	}
}

export default CommentCart;
