import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "../App";
import { ReportContext } from "../contexts/ReportContext";
import { AuthContext } from "../contexts/AuthContext";

const reportType = 4; // thread report type (in database)

class ThreadCard extends React.Component {
	static contextType = AuthContext;

	constructor(props) {
		// props.thread innehåller all information om tråden.
		super(props);
		this.state = {
			content: props.thread.content,
			title: props.thread.title,
			isEditable: false,
			showCommentButton: this.props.showCommentButton,
		};
	}

	handleClick(target) {
		if (target.innerText === "Comment") {
			this.props.toggleComment(true);
			setTimeout(() => {
				document.querySelector(".comment-newComment").childNodes[0].focus();
			}, 50);
		}
	}

	gotoThread(props) {
		this.props.handleThreadClick(props);
	}

	handleReport(showReportPopup) {
		showReportPopup({ targetType: reportType, targetId: this.props.thread.id });
	}

	render() {
		return (
			<ReportContext.Consumer>
				{(context) => {
					const { showReportPopup } = context;
					return (
						<div className="thread">
							<div
								className="thread-header">
								<div className="thread-thread-header-buttons">
									{EditButton(
										this,
										this.props.thread,
										this.props.loggedInUser,
										this.props.fetchThreads
									)}
									{DeleteButton(
										this.props.thread,
										this.props.loggedInUser,
										this.props.isAdmin
									)}
								</div>
								<div className="thread-title" 
								onClick={() => this.gotoThread(this.props.thread.id)}>
									<ThreadTitle
										title={this.state.title}
										id={this.props.thread.id}
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
									<button
										onClick={(e) => this.handleClick(e.target)}
										className="thread-button"
										style={{
											display: this.props.showCommentButton ? "block" : "none",
										}}
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
										onClick={(e) => this.handleReport(showReportPopup)}
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
				}}
			</ReportContext.Consumer>
		);
	}
}

function EditButton(parent, threadProp, loggedInUser, fetchThreads) {
	if (threadProp.creatorId === loggedInUser.id) {
		if (parent.state.isEditable) {
			function abortEdit() {
				parent.setState({ title: parent.props.thread.title });
				parent.setState({ content: parent.props.thread.content });
				parent.setState({ isEditable: !parent.state.isEditable });
				// props.setState({ isEditable: !props.state.isEditable });
			}

			function saveThread() {
				let thread = {
					id: threadProp.id,
					title: parent.state.title,
					content: parent.state.content,
				};

				axios
					.put("http://localhost:8080/rest/threads/editThread/", thread)
					.then((response) => {
						fetchThreads();
						parent.setState({ isEditable: !parent.state.isEditable });
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
				parent.setState({ isEditable: !parent.state.isEditable });
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

function DeleteButton(threadProp, loggedInUser, isAdmin) {
	console.log(loggedInUser);
	if (
		threadProp.creatorId === loggedInUser.id ||
		loggedInUser.role === "GROUPADMIN" ||
		loggedInUser.role === "GROUPMODERATOR" ||
		isAdmin
	) {
		function handleClick() {
			if (window.confirm("Are you sure you want to delete this")) {
				axios
					.put("/rest/threads/deleteThread/" + threadProp.id)
					.then((response) => {
						window.location.reload();
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
		return <span>{props.title}</span>;
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
