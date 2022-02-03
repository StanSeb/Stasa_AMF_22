import axios from 'axios';
import React, { Component } from 'react';

export default class Profile extends Component {
constructor(props){
    super(props);
    this.state = {
        groups: [],
        user_id: 1
    }
}


componentDidMount() {
  axios
    .get("http://localhost:8080/GetMembersByUserId/" + this.state.user_id )
    .then((response) => response.data)
    .then((data) =>{
      this.setState({groups: data});
      console.log(this.state.groups);
    });
}



  render() {

    return <div>PROFILE PAGE

<div>{this.state.groups.map((group) =>( 
            <ul key={group.id}> 
             <li> Title: <span>{group.group.title}</span> <br />
                  Description: <span>{group.group.description}</span> <br />
                  Group role: <span>{group.memberRoles.title}</span>

               </li>
            </ul>  
            ))}</div>

    </div>;



}
}
