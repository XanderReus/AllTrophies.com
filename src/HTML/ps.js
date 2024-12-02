import React from 'react';
import { Link } from 'react-router-dom';
import PSNComponent from '../components/PSNComponent'; // Ensure the import path is correct
import logo from './CSS/img/ACHlogo.png';
import './CSS/pspage.css'; // Ensure the CSS file path is correct

const PSPage = () => {
    return (
        <div className="pspage">
            <div className="animation-containerps">
                <div className="animation-backgroundps">
                    <div className="pstri"></div>
                    <div className="psx"></div>
                    <div className="pscir"></div>
                    <div className="pssqu"></div>
                </div>
            </div>
            <div>
                {/* Navbar */}
                <header className="headerst">
                    <Link to="/">
                        <button>
                            <img src={logo} className="logo" alt="Logo" />
                        </button>
                    </Link>
                    <nav className="navbarst">
                        <ul className="nav-linksst">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">All ACH</a></li>
                            <li><a href="#">Types</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </header>

                {/* PSN Search Component */}
                <PSNComponent />

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 ACH Database. All rights reserved. CaveMen inc.</p>
                </footer>
            </div>
        </div>
    );
};

export default PSPage;
