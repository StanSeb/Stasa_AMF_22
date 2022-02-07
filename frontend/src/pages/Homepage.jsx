import axios from 'axios';
import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],

    }
  }


  componentDidMount() {
    axios
      .get("http://localhost:8080/rest/groups/getAllGroups")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ groups: data });
        console.log(this.state.groups);
      });
  }

 
render() {

    return <div>Homepage

      <div>{this.state.groups.map((group) => (
        <ul key={group.id}>
          <li> <Link to={`/group/${group.id}`}><span>{group.title}</span></Link>:<br />
            Description: <span>{group.description}</span> <br />
          </li>
        </ul>
      ))}</div>

    </div>;



  
}
}
