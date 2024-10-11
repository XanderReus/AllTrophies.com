// src/App.js
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import SteamComponents from './components/SteamComponents';
import MyApp from "./HTML/HP";
import Steam from './HTML/steam';
import PlayStation from './HTML/ps';
import Xbox from './HTML/xbox';
import './index.css';

function App() {
    useEffect(() => {
        document.body.classList.add('animation'); // Add the animation class when the component mounts
        <div className="triangle"></div>
    }, []);


    return (
        <Router>
            <>
                <div className="triangle"></div>
                <div className="x-shape"></div>
                <Routes>
                    <Route exact path="/" element={<MyApp/>}/>
                    <Route path="/steam" element={<Steam/>}/>
                    <Route path="/playstation" element={<PlayStation/>}/>
                    <Route path="/xbox" element={<Xbox/>}/>
                </Routes>
            </>
        </Router>
    );
}


export default App;