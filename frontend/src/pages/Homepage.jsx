import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],

    }
  }


  componentDidMount() {
    axios
      .get("http://localhost:8080/rest/groups/getAllActiveGroups")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ groups: data });
      });
  }


  render() {

    return <div className='homepage-container'>
      <div className="homepage-title">
        <h2>Forumets grupper</h2>
      </div>
      <ul className='list-container'>{this.state.groups.map((group) => (
          <li key={group.id}> <Link to={`/group/${group.id}`}><span>{group.title}</span></Link>:<br />
            Description: <span>{group.description}</span> <br />
          </li>
      ))}</ul>

    </div>;




  }
}
