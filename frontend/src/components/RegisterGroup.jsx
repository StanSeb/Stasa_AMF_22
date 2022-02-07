import React, { Component } from 'react';
import axios from 'axios'
export default class RegisterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userObj : this.props.userObj,
      
			group: {
        userId: "",
				title: "",
				description: "",				        	
			}       
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
      userId : this.state.userObj.id,
			title: this.state.title,
			description: this.state.description,      
		};

    this.setState({ group }, () => {
			axios
				.post("/rest/groups/register/group", this.state.group)
				.then((response) =>{
          if(response.data ==="successful")
          {alert("Group created successfully")}
          else{alert("Group title is unavailable")}
        })
		});
    
  }

  render() { 
    return (
    
      <div className="newGroup">
        <label>Title: </label> 
        <input type="text" value={this.state.title} onChange={this.titleChange}/>
        <label>Description: </label> 
        <input type="text" value={this.state.description} onChange={this.descriptionChange}/>
        <button onClick={() => this.registerGroup()}>Register Group</button>
      </div>
  )}
}
