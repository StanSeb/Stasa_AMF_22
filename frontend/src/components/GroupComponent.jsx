import axios from 'axios';
import React, { Component } from 'react';

export default class GroupComponent extends Component {
constructor(props){
    super(props);
    this.state = {
        groups: [],
        user_id: 7
    }
}


componentDidMount() {
  axios
    .get("http://localhost:8080/rest/getByUserId/" + this.state.user_id )
    .then((response) => response.data)
    .then((data) =>{
      this.setState({groups: data});
      console.log(this.state.groups);
    });
}



  render() {

    return <div>Groups list

<div>{this.state.groups.map((group) =>(
            <ul key={group.id}> 
             <li> Title: <span>{group.title}</span> <br />
                  Description: <span>{group.description}</span>
               </li>
            </ul>  
            ))}</div>

    </div>;



}
}
