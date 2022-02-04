import axios from 'axios';
import React, { Component } from 'react';

export default class OneGroupPage extends Component {
    constructor(props){
        super(props);
        this.state = {
        groups: [], 
    }
}

componentDidMount() {
  axios.get("/rest/member/memberByGroupId/1") // props -> group id
       .then((response) => response.data)
       .then((data) =>{
        this.setState({groups: data});
        console.log(this.state.groups);
    });
}

render() {
    return(<>
        <div className="group-view">
            <div>{this.state.groups.map((group) =>( 
                <div key={group.userId}>
                    <p>Title: <span>{group.title}</span><br />
                    Description: <span>{group.description}</span></p> 
                </div>
            ))}</div>
            <p>Medlemar:</p>
            <div>{this.state.groups.map((group) =>(
                <ul key={group.userId}> 
                    <li> 
                         <span>{group.user_name} - </span> <span><i>{group.role}</i></span><br /><br />
                    </li>
                </ul>  
            ))}</div>
        </div>
        <div>
            <button>Bli medlem</button>
        </div>
        </>)}

}