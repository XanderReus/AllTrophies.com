import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SteamComponents from '../components/SteamComponents';
import logo from "./CSS/img/ACHlogo.png";
import "./CSS/Steam.css";

const Steam = () => {
    const [steamId, setSteamId] = useState(''); // Default SteamID64
    const [searchInput, setSearchInput] = useState(''); // State to store user input

    // Handle the form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        setSteamId(searchInput); // Update the steamId with user input
        console.log("Searching for Steam User 64: ", searchInput); // Debug log
    };

    return (
        <div className="steamcss">
            <div className="animation-containerst">
                <div className="animation-backgroundst"></div>
            </div>
            <div>
                {/* Navbar */}
                <header className="headerst-steam">
                    <Link to="/">
                        <button>
                            <img src={logo} className="logo" alt="Logo"/>
                        </button>
                    </Link>
                    <nav className="navbarst">
                        <ul className="nav-linksst">
                            <li><a href="#">Go to Top</a></li>
                            <li><a href="#">All ACH</a></li>
                            <li><a href="#">Types</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </header>

                {/* Search Bar */}
                <form className="searchs" onSubmit={handleSearchSubmit}>
                    <input
                        id="search-input-field"
                        type="text"
                        className="searchsinput"
                        placeholder="Enter Steam User 64"
                        aria-label="Steam User 64"
                        aria-describedby="button-addon2"
                        value={searchInput} // Bind to searchInput state
                        onChange={(e) => setSearchInput(e.target.value)} // Update searchInput state on change
                    />
                    <button className="btn btn-secondary custom-btn btn-lg" type="submit" id="button-addon2">
                        Search
                    </button>
                </form>

                <div className="steamid-button-container text-center mt-3 btn-lg">
                    <a href="https://steamid.io/" target="_blank" rel="noopener noreferrer">
                        <button className="btn btn-primary">Get Steam-64 code</button>
                    </a>
                </div>

                {/* Render SteamComponents with updated steamId */}
                <testS className="testS">
                    <SteamComponents steamid={steamId} setSteamId={setSteamId}/>
                </testS>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 ACH Database. All rights reserved. CaveMen inc.</p>
                </footer>
            </div>
        </div>
    );
};

export default Steam;