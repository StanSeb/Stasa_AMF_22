import React from "react";
import axios from "axios";

class ReportForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        targetUser: "",
        reportDescription: "",
      },
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
    this.setState({ title: event.target.value });
  }

  contentChange(event) {
    this.setState({ content: event.target.value });
  }

  postThread() {
    let thread = {
      title: this.state.title,
      content: this.state.content,
      groupId: this.props.group_id,
      creatorId: this.props.user_id,
    };

    this.setState({ thread }, () => {
      console.log(this.state.thread);
      axios
        .post("http://localhost:8080/rest/threads/newThread", this.state.thread)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  render() {
    return (
      <>
        <div className="new-thread">
          <label>Title</label>
          <input
            type="text"
            className="new-thread-title"
            value={this.state.title || ""}
            onChange={this.titleChange}
          />
          <label>Content</label>
          <textarea
            className="new-thread-content"
            value={this.state.content}
            onChange={this.contentChange}
          />
          <button onClick={() => this.postThread()}>Post</button>
        </div>
      </>
    );
  }
}

export default NewThread;
