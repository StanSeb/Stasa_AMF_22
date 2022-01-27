import React, { Component, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import RegisterGroup from './components/RegisterGroup'
import GroupComponent from './components/GroupComponent'
import Register from "./pages/Register";

// Import the functions you need from the SDKs you need
class App extends Component {
  

  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createGroup" element={<RegisterGroup />} />
          <Route path="/getGroups" element={<GroupComponent />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    )
  }
}
export default App;