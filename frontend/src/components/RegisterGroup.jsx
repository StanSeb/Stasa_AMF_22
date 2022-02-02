import React, { Component } from 'react';
import axios from 'axios'

export default class RegisterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
			group: {
        id:"",
				title: "",
				description: "",				        	
			}, 
      /* 
      member:{
        user:{
          id: 3
        },
        memberRole: {
          id: 3
        },
        group: {
          id: this.state.group.id
        }
      },
      */
      message: []
    
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
  /* 
registerMember(){
  let member= {
    user:{id: 3},
    memberRole: {id: 3},
    group: {id: this.state.group.id}
  };

  fetch ("http://localhost:8080/register/member", {
       method: 'POST',
       headers: { "Content-Type": "application/json" },
      body: JSON.stringify(member)})
      .then((response) => response.data)
    .then((data) =>{
      console.log(this.state.member);
    });
}
*/
  registerGroup(){
    let group = {
			title: this.state.title,
			description: this.state.description,      
		};
       
     fetch ("http://localhost:8080/register/group", {
       method: 'POST',
       headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group)})
      .then((response) => response.data)
    .then((data) =>{
      this.setState({message: data});
      console.log(this.state.message);
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
