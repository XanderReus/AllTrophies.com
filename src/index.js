// src/index.js
import React from 'react';
// Correct import for React 18
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import SteamComponents from './components/SteamComponents';

createRoot(document.getElementById('root')).render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/steam-services" element={<SteamComponents />} />
        </Routes>
    </Router>
);
