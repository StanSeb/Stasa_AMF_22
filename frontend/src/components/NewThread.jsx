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
    
    let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3Rhc2EtZGEzZDUiLCJhdWQiOiJzdGFzYS1kYTNkNSIsImF1dGhfdGltZSI6MTY0MjY4ODIxNSwidXNlcl9pZCI6InJZNHRUS2VEQUViRkhReXZRUUhiNXBIbXllVjIiLCJzdWIiOiJyWTR0VEtlREFFYkZIUXl2UVFIYjVwSG15ZVYyIiwiaWF0IjoxNjQyNjg4MjE1LCJleHAiOjE2NDI2OTE4MTUsImVtYWlsIjoibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsibWFydGluLncuam9uc3NvbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ibAUW1_bf1cdkf_WZOIx4mlSsyK5rnrzWv4N0SQV2QKf0Jq8CqhyTQhQHb3h3LvXsXKF1ZuMsLXKXnubU_FRE9jnZgLDXXI_LLP3EGJvn870Bl0HSIS6_QI4yZmSc1-UUsSrD68X_9lDzbdiGM-ccA0x1bXFzbrc_xovKPbbbYSfUULWgMVVlc2VcfXT9vNScu7n6_G9vVGm6_mgiaSzuUEt5CU16_heF0DLi4oVr4KvS8b47iwPLx2EgS13lV7Maz8UcbgeKwmKVaMqpJg81tWvgy9JBKdfH7fVKf6BkpQEc-OmtwjmD0Unl0_X0qy0QpLG0x7Z-D7CZOG9EIJowA";

    Axios({
      method: "POST",
      url: "http://localhost:8080/threads/newthread",
      data: threadObject,
      headers: {Authorization: "Bearer " + token}
    })
      .then(res => {
      console.log(res)
      })
      .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <>
        <div className="newThread">
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