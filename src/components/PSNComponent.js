import React, { useState } from "react";
import "../HTML/CSS/pspage.css";

const PSNComponent = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3001/psn-data?username=${username}`);
            const data = await response.json();
            setUserData(data);
            setError("");
        } catch (error) {
            setError("Failed to fetch user data");
            console.error(error);
        }
    };

    const formatTrophies = (trophies) => {
        if (!trophies) return <li>No data available</li>;
        return Object.entries(trophies).map(([type, count]) => (
            <li key={type}>
                <strong>{capitalize(type)}:</strong> {count}
            </li>
        ));
    };

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const hasPlatinum = (earnedCounts) => {
        return earnedCounts?.platinum > 0;
    };

    // Function to calculate the percentage of earned trophies
    const calculatePercentage = (earnedCounts, trophyCounts) => {
        const totalEarned = Object.values(earnedCounts || {}).reduce((a, b) => a + b, 0);
        const totalDefined = Object.values(trophyCounts || {}).reduce((a, b) => a + b, 0);

        return totalDefined > 0 ? ((totalEarned / totalDefined) * 100).toFixed(2) : 0;
    };

    return (
        <div className="psn-container">
            <h1 className="psn-header">PSN Achievements</h1>
            <div className="psn-search-container">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter PSN username"
                    className="psn-search-input"
                />
                <button onClick={handleSearch} className="psn-search-button">
                    Fetch PSN Achievements
                </button>
            </div>

            {error && <p className="psn-error-message">{error}</p>}

            {userData && (
                <div className="psn-profile-container">
                    <div className="psn-profile">
                        <img
                            src={userData.profile.avatarUrl || 'https://via.placeholder.com/100'}
                            alt="Profile Avatar"
                            className="psn-profile-avatar"
                        />
                        <h2 className="psn-profile-username">{userData.profile.username || 'Unknown User'}</h2>
                    </div>

                    <div className="psn-achievements-container">
                        {userData.userTitles.map((title, index) => (
                            <div key={index} className="psn-achievement">
                                <div className="psn-achievement-header">
                                    <div className="psn-achievement-info">
                                        <h3 className="psn-game-name">{title.gameName || 'Unknown Game'}</h3>
                                        <p className="psn-trophy-count">
                                            {Object.values(title.earnedCounts || {}).reduce((a, b) => a + b, 0)} trophies earned
                                            {hasPlatinum(title.earnedCounts) && <img src="https://i.psnprofiles.com/guides/18274/522ffa.png" alt="Platinum" className="psn-platinum-icon" />}
                                        </p>
                                    </div>
                                    <img
                                        src={title.gameURL || 'placeholder.png'}
                                        alt="Game Image"
                                        className="psn-game-image"
                                    />
                                </div>
                                <div className="psn-trophy-details">
                                    <p><strong>Trophies Defined:</strong></p>
                                    <ul>{formatTrophies(title.trophyCounts)}</ul>
                                    <p><strong>Trophies Earned:</strong></p>
                                    <ul>{formatTrophies(title.earnedCounts)}</ul>
                                    {/* Display the earned percentage next to the trophies */}
                                    <p><strong>Percentage Earned:</strong>
                                        {calculatePercentage(title.earnedCounts, title.trophyCounts)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PSNComponent;
