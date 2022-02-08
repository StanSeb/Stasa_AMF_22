import React from "react";
import axios from "axios";

class NewThread extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			thread: {
				title: "",
				content: "",
				groupId: "",
				creatorId: "",
			},
		};

		this.titleChange = this.titleChange.bind(this);
		this.contentChange = this.contentChange.bind(this);
	}

	titleChange(event) {
			this.setState((prevState)=>{

			let thread=prevState.thread
			thread.title=event.target.value
			return {thread}
		})
	}

	contentChange(event) {
		this.setState((prevState)=>{

			let thread=prevState.thread
			thread.content=event.target.value
			return {thread}
		})
	}

	postThread() {
		if(this.state.thread.title.length>3 && this.state.thread.content.length>3){

			let thread = {
				title: this.state.thread.title,
				content: this.state.thread.content,
				groupId: this.props.groupId,
				creatorId: this.props.loggedInUser.id,
			};
			
			this.setState({ thread }, () => {
				console.log(this.state.thread)
				
				axios
				.post("/rest/threads/newThread", this.state.thread)
				.then((response) => {
					this.props.cancelPost(false);
					this.props.fetchThreads();
				})
				.catch((error) => {
					console.log(error);
				});
			});
		}else {
			alert("Titel och/eller innehåll måste innehålla mer än 3 tecken!!")
		}
	}

	render() {
		return (
			<>
				<div className="new-thread">
					<label>Title</label>
					<input
						type="text"
						className="new-thread-title"
						value={this.state.thread.title}
						onChange={this.titleChange}
					/>
					<label>Content</label>
					<textarea
						className="new-thread-content"
						value={this.state.thread.content}
						onChange={this.contentChange}
					/>
					<button onClick={() => this.postThread()}>Skapa</button>
					<button onClick={() => this.props.cancelPost(false)}>Avbryt</button>
				</div>
			</>
		);
	}
}

export default NewThread;
