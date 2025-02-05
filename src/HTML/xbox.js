import React from 'react';
import './CSS/xbox.css';
import {Link} from "react-router-dom";
import logo from "./CSS/img/ACHlogo.png"; // Ensure the CSS path is correct

export default function xbox() {
    return <div className={"backgroundxbox"}>
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
        <div className={"xbox_text"}>
            <h1>Api's</h1>
            <p className={"xbox_text"}
            >We wouden de Xbox achievements tracken via api’s<br/> dus we zijn opzoek gegaan naar api’s uiteindelijk
                hebben <br/>we
                er
                2 gevonden. Openxbl zag er veelbelovend uit maar om die <br/>te kunnen gebruiken hadden we Microsoft
                azure <br/>nodig
                maar om Microsoft azure te gebruiken moet je je<br/> creditcard informatie opgeven en die hebben wij
                niet.<br/> We
                hadden
                ook een api van Microsoft zelf gevonden maar <br/>die was alleen voor achievements voor je eigen games
                maken.
            </p> <br/>
            <br/>
        </div>
        <div className="scraping">
            <h1>Scraping</h1>
            Toen de api’s niet werkte gingen we proberen te scrapen.<br/> Dus gingen wij opzoek naar een site om van te
            scrapen
            <br/>aangezien doe officiële Xbox site geen achievements bijhoud.<br/> We hadden 8 potentiële sites gevonden
            om te
            scrapen.
            <br/>Maar toen we de sites gingen proberen kon je alleen spelers<br/> vinden die op die specifieke site zijn
            ingelogd
            met hun
            Xbox account.<br/> Dus scrapen kon ook niet.<br/>
            Dit zijn de sites die wij gevonden hadden voor het scrapen:
            <div className="linksxbox">
                <br/>
                <a href="http://Xboxachievements.com" className="btn btn-primary">xboxachievements.com</a>
                <br/>
                <a href="http://mygamerprofile.net" className="btn btn-primary">mygamerprofile.net</a>
                <br/>
                <a href="http://gamertagnation.com" className="btn btn-primary">gamertagnation.com</a>
                <br/>
                <a href="http://exophase.com" className="btn btn-primary">exophase.com</a>
                <br/>
                <a href="http://xbltracker.com" className="btn btn-primary">xbltracker.com</a>
                <br/>
                <a href="http://trueachievements.com" className="btn btn-primary">trueachievements.com</a>
                <br/>
                <a href="http://playtracker.net" className="btn btn-primary">playtracker.net</a>
                <br/>
                <a href="http://metagamerscore.com" className="btn btn-primary">metagamerscore.com</a>
                <br/>
                <br/>
            </div>
        </div>
        <div>
            <footer className="footer">
                <p>&copy; 2024 ACH Database. All rights reserved. CaveMen inc.</p>
            </footer>
        </div>
    </div>
}