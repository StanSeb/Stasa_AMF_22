import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

class ThreadCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: props.thread.content,
			title: props.thread.title,
			isEditable: false,
		};
	}
	handleClick(target) {
		console.log(target.innerText + " on " + this.props.thread.id);
	}

	render() {
		return (
			<div className="thread">
				<div className="thread-header">
					{editButton(this, this.props.thread.id)}
					<div className="thread-title">
						<ThreadTitle
							title={this.state.title}
							id={this.props.thread.id}
							handleThreadClick={this.props.handleThreadClick}
							parent={this}
							isEditable={this.state.isEditable}
						/>
					</div>
					<span>/ {this.props.thread.creatorId}</span>
				</div>
				<div className="thread-main">
					{ThreadContent(this, this.state.isEditable)}
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

function editButton(props, id) {
	if (props.state.isEditable) {
		function abortEdit(target) {
			props.setState({ isEditable: !props.state.isEditable });
		}

		function saveThread() {
			// console.log(props.state.title, props.state.content, id);
			let thread = {
				id: id,
				title: props.state.title,
				content: props.state.content,
			};

			axios
				.put("http://localhost:8080/rest/threads/editThread/", thread)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		return (
			<div className="thread-edit-button">
				<button onClick={(e) => abortEdit(e)}>Avbryt</button>
				<button onClick={saveThread}>Spara</button>
			</div>
		);
	} else {
		function handleClick(target) {
			props.setState({ isEditable: !props.state.isEditable });
		}

		return (
			<button
				className="thread-edit-button"
				onClick={(e) => handleClick(e.target)}
			>
				Redigera
			</button>
		);
	}
}

function ThreadTitle(props) {
	function handleChange(event) {
		props.parent.setState({ title: event.target.value });
	}

	if (props.isEditable) {
		return (
			<input
				type="text"
				value={props.parent.state.title}
				onChange={handleChange}
			></input>
		);
	} else {
		function handleClick() {
			if (typeof props.handleThreadClick === "function") {
				props.handleThreadClick(props);
			}
		}

		return <span onClick={() => handleClick(props.title)}>{props.title}</span>;
	}
}

function ThreadContent(props, isEditable) {
	function handleChange(event) {
		props.setState({ content: event.target.value });
	}

	if (isEditable) {
		return (
			<textarea
				defaultValue={props.state.content}
				onChange={handleChange}
			></textarea>
		);
	} else {
		return <p>{props.state.content}</p>;
	}
}

export default ThreadCard;
