import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Navigate,} from 'react-router-dom';
import logo from "./CSS/img/ACHlogo.png";
import TrophyList from "../components/PSNComponents";
import "./CSS/Index.css"

const ps = () => {

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


            <div>
                <h1>PlayStation User Data</h1>

                <TrophyList/> {/* This will fetch and display the PSN user trophies */}
            </div>



        </div>
    );
}
export default ps;