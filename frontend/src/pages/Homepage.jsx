import axios from 'axios';
import React, { Component } from 'react';

export default class Homepage extends Component {

constructor(props){
  
    super(props);
    this.state = {
        groups: [], 
    }
}


componentDidMount() {
  axios
    .get("/getAllGroups/" )
    .then((response) => response.data)
    .then((data) =>{
      this.setState({groups: data});
      console.log(this.state.groups);
    });
}

 
render() {

  return <div>Homepage

 <div>{this.state.groups.map((group) =>(
            <ul key={group.id}> 
             <li> id: <span>{group.id}</span> <br />
                  Title: <span>{group.title}</span> <br />
                  Description: <span>{group.description}</span> <br />
               </li>
            </ul>  
            ))}</div>

    </div>;



}
}
