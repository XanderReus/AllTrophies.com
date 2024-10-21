// // import React, {useState} from 'react';
// // import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
// // import app from '../services/PSNService';
// // import PORT from '../services/PSNService';
// // import GamesList from '../components/PSNComponents';
// // // import MyApp from "../App";
// // import logo from "./CSS/img/ACHlogo.png";
// //
// //
// // const ps = () => {
// //     // eslint-disable-next-line react-hooks/rules-of-hooks
// //     const [steamId, setSteamId] = useState('76561198239999462'); // State for steamId, which is used in SteamComponents
// //
// //     return (
// //         <div>
// //             {/*Navbar*/}
// //             <header className="header">
// //                 <nav className="navbar">
// //                     <Link to="./HP.js">
// //                         <button onClick="myFunction()"><img src={logo} className="logo" alt="Logo" style={{}}/></button>
// //                     </Link>
// //                     <ul className="nav-links">
// //                         <li><a href="#">Home</a></li>
// //                         <li><a href="#">All ACH</a></li>
// //                         <li><a href="#">Types</a></li>
// //                         <li><a href="#">Contact</a></li>
// //                     </ul>
// //                 </nav>
// //             </header>
// //             {/* Render SteamComponents directly */}
// //             <GamesList steamid={steamId} setSteamId={setSteamId}/>
// //             {/*footer*/}
// //             <footer className="footer">
// //                 <p>&copy; 2024 ACH Database. All rights reserved.</p>
// //             </footer>
// //         </div>
// //     );
// // }
// // export default ps;
// import React, {useState, useEffect} from 'react';
// import {Link} from "react-router-dom";
// import logo from "./CSS/img/ACHlogo.png";
// import SteamComponents from "../components/SteamComponents";
//
// // function GameList() {
// //     const [games, setGames] = useState([]);
// //
// //     useEffect(() => {
// //         // Fetch the JSON data from the public folder
// //         fetch('/games.json')
// //             .then((response) => response.json())
// //             .then((data) => {
// //                 setGames(data);
// //             })
// //             .catch((error) => {
// //                 console.error('Error fetching the games data:', error);
// //             });
// //     }, []);
// //
// //     return (
// //         <div>
// //             <h1>Game List</h1>
// //             {games.length === 0 ? (
// //                 <p>Loading...</p>
// //             ) : (
// //                 <ul>
// //                     {games.map((game, index) => (
// //                         <li key={index}>
// //                             <h2>{game.gameName}</h2>
// //                             <p>Platform: {game.platform}</p>
// //                             <p>Progress: {game.earnedCounts.bronze} / {game.trophyTypeCounts.bronze} Bronze Trophies</p>
// //                             <p>Progress: {game.earnedCounts.silver} / {game.trophyTypeCounts.silver} Silver Trophies</p>
// //                             <p>Progress: {game.earnedCounts.gold} / {game.trophyTypeCounts.gold} Gold Trophies</p>
// //                             <p>Platinum: {game.earnedCounts.platinum ? 'Yes' : 'No'}</p>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // }
// //
// // export default GameList;
//
//
// const GameList = () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [steamId, setSteamId] = useState('76561198239999462'); // State for steamId, which is used in SteamComponents
//
//     return (
//         <div>
//             {/*Navbar*/}
//             <header className="header">
//                 <Link to="/">
//                     <button><img src={logo} className="logo" alt="Logo" style={{}}/></button>
//                 </Link>
//                 <nav className="navbar">
//                     <ul className="nav-links">
//                         <li><a href="#">Home</a></li>
//                         <li><a href="#">All ACH</a></li>
//                         <li><a href="#">Types</a></li>
//                         <li><a href="#">Contact</a></li>
//                     </ul>
//                 </nav>
//             </header>
//
//             {/*<searchS className="searchs">*/}
//             {/*    <input id="search-input-field" type="text" className="form-control" placeholder="Name"*/}
//             {/*           aria-label="Name" aria-describedby="button-addon2"/>*/}
//             {/*    <button className="btn btn-secondary custom-btn" type="submit" id="button-addon2">Search</button>*/}
//             {/*</searchS>*/}
//
//
//             {/* Render SteamComponents directly */}
//             {/*<testS className="testS">*/}
//             {/*    <SteamComponents steamid={steamId} setSteamId={setSteamId}/>*/}
//             {/*</testS>*/}
//
//             const [games, setGames] = useState([]);
//
//             useEffect(() => {
//             // Fetch the JSON data from the public folder
//             fetch('/games.json')
//                 .then((response) => response.json())
//                 .then((data) => {
//                     setGames(data);
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching the games data:', error);
//                 })
//
//         }, []);
//
//             return (
//             <div>
//                 <h1>Game List</h1>
//                 {games.length === 0 ? (
//                     <p>Loading...</p>
//                 ) : (
//                     <ul>
//                         {games.map((game, index) => (
//                             <li key={index}>
//                                 <h2>{game.gameName}</h2>
//                                 <p>Platform: {game.platform}</p>
//                                 <p>Progress: {game.earnedCounts.bronze} / {game.trophyTypeCounts.bronze} Bronze Trophies</p>
//                                 <p>Progress: {game.earnedCounts.silver} / {game.trophyTypeCounts.silver} Silver Trophies</p>
//                                 <p>Progress: {game.earnedCounts.gold} / {game.trophyTypeCounts.gold} Gold Trophies</p>
//                                 <p>Platinum: {game.earnedCounts.platinum ? 'Yes' : 'No'}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//             )
//
//             {/*footer*/}
//             <footer className="footer">
//                 <p>&copy; 2024 ACH Database. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// }
// export default GameList;

// src/HTML/ps.js
import React from 'react';
import TrophyList from '../components/PSNComponents';  // Adjust path to your `TrophyList` component

function PlayStation() {
    return (
        <div>
            <h1>PlayStation User Data</h1>
            <p>udaijofuhgycvhyuijopijuhygtfyuh</p>
            <TrophyList />  {/* This will fetch and display the PSN user trophies */}
        </div>
    );
}

export default PlayStation;
