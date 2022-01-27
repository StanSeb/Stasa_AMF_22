import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import IntegrityPage from '../pages/IntegrityPage';
import RulesPage from '../pages/RulesPage';

function Navbar() {

    return <div className="containerNavbar">
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/"><h3>Hem</h3></Link>
                    </li>
                    <li>
                        <Link to="/profile"><h3>Profil</h3></Link>
                    </li>
                    <li>
                        <Link to="/rules"><h3>Regler</h3></Link>
                    </li>
                    <li>
                        <Link to="/integrity"><h3>Integritet</h3></Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/rules" element={<RulesPage/>} />
                <Route path="/integrity" element={<IntegrityPage/>} />
            </Routes> 
        </Router>
    </div>;
}

export default Navbar;