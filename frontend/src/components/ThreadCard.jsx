import React from "react";

class ThreadCard extends React.Component {
	render() {
		return (
			<div className="thread">
				<div className="threadHeader">
					<span className="threadTitle">{this.props.thread.title}</span>
					<span>/{this.props.thread.username}</span>
				</div>
				<div className="threadMain">
					<p>{this.props.thread.content}</p>
				</div>
				<div className="threadFooter">
					<div className="threadSocialButtons">
						<button>Comment</button>
						<button>Like</button>
						<button>Dislike</button>
						<button>Share</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ThreadCard;