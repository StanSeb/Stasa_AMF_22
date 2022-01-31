import React from "react";
import Axios from "axios";

class NewThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    }

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
    let threadObject = { group_id: "1QxY0euu1iD2FM5NKPcA", user_id: "W5jdoeOwwz25Zvf7aMSJ", content: this.state.content, title: this.state.title }
    
    console.log(threadObject);
  }

  render() {
    return (
      <>
        <div className="new-thread">
          <label>Title</label>
          <input type="text" value={this.state.title} onChange={this.titleChange}/>
          <label>Content</label>
          <textarea value={this.state.content} onChange={this.contentChange}/>
          <button onClick={() => this.postThread()}>Post</button>
        </div>
      </>
    )
  }
}

export default NewThread;