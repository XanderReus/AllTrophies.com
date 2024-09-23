import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SteamComponents from '../components/SteamComponents';
// import MyApp from "../App";
import trophy from "./CSS/img/trophy.png";
import logo from "./CSS/img/ACHlogo.png";


const steam = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [steamId, setSteamId] = useState('76561198239999462'); // State for steamId, which is used in SteamComponents

    return (
        <div>
            {/*Navbar*/}
            <header className="header">
                <nav className="navbar">
                    <Link to="./HP.js">
                        <button onClick="myFunction()"><img src={logo} className="logo" alt="Logo" style={{}}/></button>
                    </Link>
                    <ul className="nav-links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">All ACH</a></li>
                        <li><a href="#">Types</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </header>
            {/* Render SteamComponents directly */}
            <SteamComponents steamid={steamId} setSteamId={setSteamId}/>
            {/*footer*/}
            <footer className="footer">
                <p>&copy; 2024 ACH Database. All rights reserved.</p>
            </footer>
        </div>
    );
}
export default steam;