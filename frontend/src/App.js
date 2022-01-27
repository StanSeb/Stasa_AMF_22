import React, { Component } from "react";
import "./App.css";
import GroupPage from "./pages/GroupPage"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: {id: 1, username: "Leif Bond", privilege: "admin"},
      group: {name: "Bonds ''Speciella'' Klubb", info: "Här pratar vi bara om hemliga agenter", admin: "Leif Bond"}
    };
  }

  render() {
    return (
      <Router>
        

      <div className="App">
        <GroupPage group={this.state.group} loggedInUser={this.state.loggedInUser}/>
      </div>
    );
  }
}
export default App;
