import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {BrowserRouter as Router, Route, Routes, Navigate,} from 'react-router-dom';
import logo from "./CSS/img/ACHlogo.png";
import "./CSS/pspage.css"

const ps = () => {
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
                {/*Navbar*/}
                <header className="headerst">
                    <Link to="/">
                        <button><img src={logo} className="logo" alt="Logo" style={{}}/></button>
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

                <searchS className="searchs">
                    <input id="search-input-field" type="text" className="form-control" placeholder="Name"
                           aria-label="Name" aria-describedby="button-addon2"/>
                    <button className="btn btn-secondary custom-btn" type="submit" id="button-addon2">Search</button>
                </searchS>

                {/*footer*/}
                <footer className="footer">
                    <p>&copy; 2024 ACH Database. All rights reserved. CaveMen inc.</p>
                </footer>

            </div>
        </div>
    );
}
export default ps;
