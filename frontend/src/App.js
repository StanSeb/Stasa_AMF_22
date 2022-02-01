import React, { Component } from "react";
import "./App.css";
import "./index.css"
import Navbar from './components/Navbar'
import { waitForElementToBeRemoved } from "@testing-library/react";

class App extends Component {

  render() {
    return (
      <Navbar />
    )

  }
  
}
export default App;