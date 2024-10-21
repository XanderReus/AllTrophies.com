// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SteamComponents from './components/SteamComponents';
import MyApp from "./HTML/HP";
import Steam from './HTML/steam';
import PlayStation from './HTML/ps';
import GamesList from './components/PSNComponents'; // Adjust the path as necessary
import Xbox from './HTML/xbox';

function App() {
    return (
        <Router>
            <>
                <Routes>
                    <Route exact path="/" element={<MyApp />} />
                    <Route path="/steam" element={<Steam />} />
                    <Route path="/ps" element={<GamesList />} />
                    <Route path="/xbox" element={<Xbox />} />
                </Routes>
            </>
        </Router>
    );
}


export default App;