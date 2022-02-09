import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

class CommentCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: "",
			isEditable: false,
		};
		this.updateContent= this.updateContent.bind(this);
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
	updateContent(event) {
		this.setState((prevState)=>{
			let comment=prevState.comment
			comment.content=event.target.value
			return {comment}
		});
	}


	render() {
		return (
			<div className="comment-card">
				{returnComments(this.state.comment,this.state.isEditable,this.updateContent)}
				{DeleteButton(
					this.state.comment,
					this.props.loggedInUser,
					this.props.fetchComments
				)}
				{EditButton(this, this.state.comment, this.props.loggedInUser,this.props.fetchComments)}
				<div className="comment-social-buttons"></div>
			</div>
		);
	}
}


function returnComments(comment, isEditable,updateContent) {
	if (!isEditable) {

		return (
			<>

				<span className="comment-content">{comment.content}</span> / <span>{comment.username}</span>
			</>
		);
	}
	else{
		return (

			<textarea className="comment-content" value={comment.content} onChange={updateContent}></textarea>
			)
	}
}


function EditButton(parent, comment, loggedInUser,fetchComments) {
	if (comment.creatorId === loggedInUser.id) {
		if (parent.state.isEditable) {
			function abortEdit() {
				parent.setState({ isEditable: !parent.state.isEditable });
				parent.setState((prevState)=>{let comment=prevState.comment
				comment.content = parent.props.comment[1]

				return{comment}
				})

				// parent.setState({ isEditable: !parent.state.isEditable });
			}

			function saveComment(props) {
				console.log(props)
				let comment = {
					id: props.id,
					content: props.content,
				};

				axios
					.put("/rest/threads/editComment/", comment)
					.then((response) => {
						console.log(response);
						parent.setState({ isEditable: !parent.state.isEditable });
						fetchComments()
					})
					.catch((error) => {
						console.log(error);
					});
			}

			return (
				<div className="comment-edit-button">
					<button onClick={(e) => abortEdit(e)}>Avbryt</button>
					<button onClick={()=>saveComment(comment)}>Spara</button>
				</div>
			);
		} else {
			function handleClick() {
				parent.setState({ isEditable: !parent.state.isEditable });
			}

			return (
				<button
					className="comment-edit-button"
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

function DeleteButton(comment, loggedInUser, fetchComments) {
	if (
		comment.creatorId === loggedInUser.id ||
		loggedInUser.privilege === "admin" ||
		loggedInUser.privilege === "moderator"
	) {
		function handleClick() {
			if (window.confirm("Are you sure you want to delete this")) {
				axios
					.put("/rest/threads/deleteComment/" + comment.id)
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
