// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyApp from "./HTML/HP";
import Steam from './HTML/steam';
import PlayStation from './HTML/ps';
import Xbox from './HTML/xbox';
import './index.css';
import "./HTML/CSS/Index.css";

function App() {
    return (
        <Router>
            <div className="animation-container">
                <div className="animation-background">
                    <div className="Circle"></div>
                    <div className="Square"></div>
                    <div className="triangle"></div>
                    <div className="x-shape"></div>
                </div>
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<MyApp />} />
                        <Route path="/steam" element={<Steam />} />
                        <Route path="/ps" element={<PlayStation />} />
                        <Route path="/xbox" element={<Xbox />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;