import React, { Component } from 'react';
import axios from 'axios'

export default class RegisterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
			group: {
				title: "",
				description: "",
				user: {
          id: 7
        }
				
			},
		};

    this.titleChange = this.titleChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);

  }

  titleChange(event) {
    this.setState({ title: event.target.value });
  }
  descriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  registerGroup(){


		let group = {
			title: this.state.title,
			description: this.state.description,
			user_id: this.props.user_id
		};

    this.setState({ group }, () => {
      console.log(this.state.group)
			axios
				.post("http://localhost:8080/register/group", this.state.group)
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
      <div className="newGroup">
        <label>Title: </label> 
        <input type="text" value={this.state.title} onChange={this.titleChange}/>
        <label>Description: </label> 
        <input type="text" value={this.state.description} onChange={this.descriptionChange}/>
        <button onClick={() => this.registerGroup()}>Register Group</button>
      </div>
    </>
  )}
}
