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
      message: []
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
  /* registerMember(){
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
    });}*/
  registerGroup(){
    let group = {
			title: this.state.title,
			description: this.state.description,      
		};

    axios.post("http://localhost:8080/register/group", this.state.group)
    .then((response) =>{
      console.log(response);
      console.log("this is state.group",this.state.group);
      console.log("this is  group",this.group);
      /*
      console.log(this.state.group);
      if(response.data ==="successful"){
        alert("Group created!")
      } if(response.data ==="failed"){
        alert("Group name not available")
      }
      else{alert("Error occured, try again")
    }*/
  })
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
