import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "../App";
import { ReportContext } from "../contexts/ReportContext";

const reportType = 4; // thread report type (in database)

class ThreadCard extends React.Component {
	static contextType = ReportContext;

	constructor(props) {
		// props.thread innehåller all information om tråden.
		super(props);
		this.state = {
			content: props.thread.content,
			title: props.thread.title,
			isEditable: false,
			showCommentButton:this.props.showCommentButton,
		};
	}

	handleClick(target) {
		if(target.innerText==="Comment"){
			this.props.toggleComment(true)
		}
		console.log(target);
		console.log(target.innerText + " on " + this.props.thread.id);
	}

	handleReport() {
		this.context.showReportPopup({ targetType: reportType, targetId: this.props.thread.id });
	}

	render() {
		return (
			<div className="thread">
				<div className="thread-header">
					<div className="thread-thread-header-buttons">
						{EditButton(this, this.props.thread, this.props.loggedInUser)}
						{DeleteButton(this.props.thread, this.props.loggedInUser)}
					</div>
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
					<div className="thread-social-buttons" >
						<button
							href={"/thread/comment/" + this.props.thread.id}
							onClick={(e) => this.handleClick(e.target)}
							className="thread-button" style={ {display:this.props.showCommentButton ? 'block' : 'none'}}
						>
							Comment
						</button>
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
						<a
							onClick={(e) => this.handleReport()}
							className="thread-button"
						>
							Report
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

function EditButton(props, threadProp, loggedInUser) {
	if (threadProp.creatorId === loggedInUser.id) {
		if (props.state.isEditable) {
			function abortEdit() {
				props.setState({ isEditable: !props.state.isEditable });
				// props.setState({ isEditable: !props.state.isEditable });
			}

			function saveThread() {
				let thread = {
					id: threadProp.id,
					title: props.state.title,
					content: props.state.content,
				};

				axios
					.put("http://localhost:8080/rest/threads/editThread/", thread)
					.then((response) => {
						console.log(response);
						props.setState({ isEditable: !props.state.isEditable });
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
			function handleClick() {
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
	} else {
		return <></>;
	}
}

function DeleteButton(threadProp, loggedInUser) {
	if (
		threadProp.creatorId === loggedInUser.id ||
		loggedInUser.privilege === "admin" ||
		loggedInUser.privilege === "moderator"
	) {
		function handleClick() {
			axios
				.put("http://localhost:8080/rest/threads/deleteThread/" + threadProp.id)
				.then((response) => {
					console.log(response);
					window.location.reload();
				})
				.catch((error) => {
					console.log(error);
				});
		}
		return <button onClick={() => handleClick()}>Ta bort</button>;
	} else {
		return <></>;
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
