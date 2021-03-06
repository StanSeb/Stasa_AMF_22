import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import IntegrityPage from '../pages/IntegrityPage';
import RulesPage from '../pages/RulesPage';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import MailSentPage from '../pages/MailSentPage';
import RegisterGroup from './RegisterGroup';
import GroupPage from '../pages/GroupPage';
import Homepage from '../pages/Homepage';
import NewGroup from './NewGroup';


function Navbar(props) {
    
    return <div className="app">
        <Router>
            <nav className='containerNavbar'>
                <ul style={{padding: "0"}}>
                    <li>
                        <Link to="/"><h3>Hem</h3></Link>
                    </li>
                    <li>
                        <Link to="/rules"><h3>Regler</h3></Link>
                    </li>
                    <li>
                        <Link to="/integrity"><h3>Integritet</h3></Link>
                    </li>
                    <li style={{ display: props.userObj.username ? 'none' : 'block' }}>
                        <Link to="/register"><h3>Registrera</h3></Link>
                    </li>
                    <li style={{ display: props.userObj.username ? 'none' : 'block' }}>
                        <Link to="/login"><h3>Login</h3></Link>
                    </li>
                    <li style={{ display: props.userObj.username ? 'block' : 'none' }}>
                        <Link to={"/profile/"+props.userObj.id}><h3>{props.userObj.username}</h3></Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/newGroup" element={<NewGroup />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/integrity" element={<IntegrityPage />} />
                <Route path="/login" element={<Login storeId={props.storeId} />} />
                <Route path="/profile/:id" element={<Profile userObj={props.userObj} />} />
                <Route path="/mailSent" element={<MailSentPage />}/>
                <Route path="/registerGroup" element={<RegisterGroup userObj={props.userObj}/>} />
                <Route path="/group/:id" element={<GroupPage loggedInUser={props.userObj}/>} />
                <Route path="/" element={<Homepage/>} />
            </Routes>
        </Router>
    </div>;
}

export default Navbar;