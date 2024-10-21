import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SteamComponents from '../components/SteamComponents';
import logo from "./CSS/img/ACHlogo.png";
import "./CSS/Index.css"


const steam = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [steamId, setSteamId] = useState('76561198239999462'); // State for steamId, which is used in SteamComponents

    return (
        <div>
            {/*Navbar*/}
            <header className="header">
                <Link to="/">
                    <button><img src={logo} className="logo" alt="Logo" style={{}}/></button>
                </Link>
                <nav className="navbar">
                    <ul className="nav-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">All ACH</a></li>
                        <li><a href="#">Types</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>

            <searchS className="searchs">
                <input id="search-input-field" type="text" className="form-control" placeholder="Name"
                       aria-label="Name" aria-describedby="button-addon2"/>
                <button className="btn btn-secondary custom-btn" type="submit" id="button-addon2">Search</button>
            </searchS>


            {/* Render SteamComponents directly */}
            <testS className="testS">
                <SteamComponents steamid={steamId} setSteamId={setSteamId}/>
            </testS>


            {/*footer*/}
            <footer className="footer">
                <p>&copy; 2024 ACH Database. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default steam;