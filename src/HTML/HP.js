import './CSS/Index.css';
import logo from './CSS/img/ACHlogo.png';
import {Link} from "react-router-dom";
import React from "react";

export default function MyApp() {
    return (
        <div className="animation-container">
            <div className="animation-background">
                <div className="Circle"></div>
                <div className="Square"></div>
                <div className="triangle"></div>
                <div className="x-shape"></div>
            </div>
            <div>
                <header className="header">
                    <img src={logo} className="logo" alt="Logo" style={{}}/>
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">All ACH</a></li>
                            <li><a href="#">Types</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                </header>

                <main className="main-content">
                    <section className="hero-section">
                        <h1 style={{color: 'white'}}>Welcome to the ACH Database</h1>
                        <h4 style={{color: 'white'}}>One place to check out all your achievements</h4>
                        <br/>
                        <p style={{color: 'white'}}>Please select the platform of your choosing:</p>
                    </section>

                    <section className="cardmain">
                        <Link to="/steam">
                            <button className="cardach" onClick={() => console.log('steam clicked')}>
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
                                    alt="steam"
                                />
                                <h3>STEAM</h3>
                            </button>
                        </Link>
                        <Link to="/ps">
                            <button className="cardach" onClick={() => console.log('ps clicked')}>
                                <img
                                    src="https://www.freepnglogos.com/uploads/playstation-png-logo/navy-playstation-png-logo-5.png"
                                    alt="ps"
                                />
                                <h3>PLAYSTATION</h3>
                            </button>
                        </Link>
                        <Link to="/xbox">
                            <button className="cardach" onClick={() => console.log('xbox clicked')}>
                                <img
                                    src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/xbox-icon.png"
                                    alt="xbox"
                                />
                                <h3>XBOX</h3>
                            </button>
                        </Link>
                    </section>
                </main>

                <footer className="footer">
                    <p>&copy; 2024 ACH Database. All rights reserved. CaveMen inc.</p>
                </footer>
            </div>
        </div>
    );
}
