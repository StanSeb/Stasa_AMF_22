import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import IntegrityPage from '../pages/IntegrityPage';
import RulesPage from '../pages/RulesPage';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

function Navbar(props) {
        
       
    
    
    return <div className="containerNavbar">
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><h3>Hem</h3></Link>
                    </li>
                    <li style={{ display: props.userObj.username ? 'none' : 'block' }}>
                        <Link to="/register"><h3>Registrera</h3></Link>
                    </li>
                    <li>
                        <Link to="/rules"><h3>Regler</h3></Link>
                    </li>
                    <li>
                        <Link to="/integrity"><h3>Integritet</h3></Link>
                    </li>
                    <li style={{ display: props.userObj.username ? 'none' : 'block' }}>
                        <Link to="/login"><h3>Login</h3></Link>
                    </li>
                    <li style={{ display: props.userObj ? 'block' : 'none' }}>
                        <Link to="/profile"><h3>{props.userObj.username}</h3></Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/rules" element={<RulesPage />} />
                <Route path="/integrity" element={<IntegrityPage />} />
                <Route path="/login" element={<Login storeId={props.storeId} />} />
                <Route path="/profile" element={<Profile userObj={props.userObj} />} />
            </Routes>
        </Router>
    </div>;
}

  

export default Navbar;