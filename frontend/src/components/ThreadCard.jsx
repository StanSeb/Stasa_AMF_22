import React from "react";
import axios from "axios";

class ThreadCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: ""
		}
	}

	handleClick(target) {
		console.log(target.innerText + " on " + this.props.thread.id);
	}

	componentDidMount() {
		axios
			.get("/rest/users/getUsername/38")
			.then((response) => {this.setState({username: response.data })})
	}

	render() {
		return (
			<div className="thread">
				<div className="thread-header">
					<div className="thread-title">
						<ThreadTitle
							title={this.props.thread.title}
							id={this.props.thread.id}
							handleThreadClick={this.props.handleThreadClick}
						/>
					</div>
					<span>/ {this.state.username}</span>
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

function ThreadTitle(props) {
	function handleClick() {
		if (typeof (props.handleThreadClick) === 'function') {
			props.handleThreadClick(props);
		}
	}

	return <span onClick={() => handleClick(props.title)}>{props.title}</span>;
}

export default ThreadCard;
