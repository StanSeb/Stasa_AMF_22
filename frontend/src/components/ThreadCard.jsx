import React from "react";

class ThreadCard extends React.Component {
	handleClick(target) {
		console.log(target.innerText + " on " + this.props.thread.id);
	}

	render() {
		return (
			<div className="thread">
				<div className="thread-header">
					<span className="thread-title">{this.props.thread.title}</span>
					<span>/{this.props.thread.username}</span>
				</div>
				<div className="thread-main">
					<p>{this.props.thread.content}</p>
				</div>
				<div className="thread-footer">
					<div className="thread-social-buttons">
						<a
							href={"/thread/comment/" + this.props.thread.id}
							onClick={(e) => this.handleClick(e.target)}
							className="thread-button"
						>
							Comment
						</a>
						<a
							href={"/thread/like/" + this.props.thread.id}
							onClick={(e) => this.handleClick(e.target)}
							className="thread-button"
						>
							Like
						</a>
						<a
							href={"/thread/dislike/" + this.props.thread.id}
							onClick={(e) => this.handleClick(e.target)}
							className="thread-button"
						>
							Dislike
						</a>
						<a
							href={"/thread/share/" + this.props.thread.id}
							onClick={(e) => this.handleClick(e.target)}
							className="thread-button"
						>
							Share
						</a>
					</div>
					<div className="thread-tags">
						<p>#tag1 </p>
						<p>#tag2 </p>
						<p>#tag3 </p>
					</div>
				</div>
			</div>
		);
	}
}

export default ThreadCard;
