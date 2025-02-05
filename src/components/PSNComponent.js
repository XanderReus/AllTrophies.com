import React, {useState} from "react";
import "../HTML/CSS/test.css"; // Ensure this path is correct.

/**
 * PSNComponent - React component to fetch and display PlayStation Network (PSN) user achievements.
 */
const PSNComponent = () => {
    // State variables to manage user input, fetched data, and UI states.
    const [username, setUsername] = useState(""); // Stores the entered username
    const [userData, setUserData] = useState(null); // Stores fetched user data
    const [error, setError] = useState(""); // Stores error messages
    const [loadingTrophiesIndex, setLoadingTrophiesIndex] = useState(null); // Tracks which game’s trophies are loading
    const [expandedGameIndex, setExpandedGameIndex] = useState(null); // Tracks which game section is expanded
    const [selectedGame, setSelectedGame] = useState(null); // Stores the game selected for detailed trophy view

    /**
     * Handles user search by fetching PSN profile and game data.
     */
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/psn-data?username=${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("User Data:", data);
            setUserData(data);
            setError("");
        } catch (error) {
            setError("Failed to fetch user data");
            console.error(error);
        }
    };

    /**
     * Toggles the visibility of the game details section (e.g., trophy counts).
     */
    const toggleDetails = (index) => {
        const detailsDiv = document.getElementById(`details-${index}`);
        if (!detailsDiv) {
            console.warn(`Element with ID details-${index} not found`);
            return;
        }
        detailsDiv.classList.toggle("show");
    };

    /**
     * Fetches and displays individual trophies for the selected game.
     */
    const toggleAchievementsDetail = async (index, gameId) => {
        // If the selected game is already expanded, collapse it.
        if (expandedGameIndex === index) {
            setExpandedGameIndex(null);
            return;
        }

        setExpandedGameIndex(index);
        setLoadingTrophiesIndex(index);

        try {
            const response = await fetch(
                `http://localhost:3001/psn-trophies?username=${username}&npCommunicationId=${gameId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched Earned Trophies:", data);

            // Update userData state with newly fetched trophy details.
            setUserData((prevData) => ({
                ...prevData,
                userTitles: prevData.userTitles.map((title, idx) =>
                    idx === index ? {...title, earnedTrophies: data.trophies} : title
                ),
            }));

            // Store the selected game's trophies for the modal display.
            setSelectedGame({...userData.userTitles[index], earnedTrophies: data.trophies});
            setError("");
        } catch (error) {
            setError("Failed to fetch earned trophies");
            console.error(error);
        } finally {
            setLoadingTrophiesIndex(null);
        }
    };

    /**
     * Checks if a game has at least one platinum trophy.
     */
    const hasPlatinum = (earnedCounts) => earnedCounts?.platinum > 0;

    /**
     * Calculates the total number of earned trophies.
     */
    const calculateTrophyCount = (earnedCounts) => {
        return Object.values(earnedCounts || {}).reduce((total, count) => total + count, 0);
    };

    return (
        <div className="psn-container">
            <h1 className="psn-header">PSN Achievements</h1>

            {/* Search Input */}
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

            {/* Display error messages if any */}
            {error && <p className="psn-error-message">{error}</p>}

            {/* Display User Profile and Achievements */}
            {userData && (
                <div className="psn-profile-container">
                    <div className="psn-profile">
                        <img
                            src={
                                userData.profile.avatarUrl ||
                                "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"
                            }
                            alt="Profile Avatar"
                            className="psn-profile-avatar"
                        />
                        <h2 className="psn-profile-username">{userData.profile.username || "Unknown User"}</h2>
                    </div>

                    {/* Display Games and Trophies */}
                    <div className="psn-achievements-container">
                        {userData.userTitles.map((title, index) => {
                            const trophyCount = calculateTrophyCount(title.earnedCounts);

                            return (
                                <div key={index} className="games-container">
                                    <div className="psn-achievement-header"
                                         onClick={() => toggleDetails(index)}>
                                        <div className="psn-achievement-info">
                                            <h3>{title.gameName || "Unknown Game"}</h3>
                                            <p>{title.platform}</p>
                                            <p>
                                                {trophyCount} trophies earned &nbsp;
                                                {hasPlatinum(title.earnedCounts) && (
                                                    <img
                                                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb9cfb5b-aa09-4dc2-b19b-931576776dae/de4fujh-3cf64804-b0b2-4d1a-8f60-928f1ddeb575.png"
                                                        alt="Platinum"
                                                        className="psn-platinum-icon"
                                                    />
                                                )}
                                            </p>
                                        </div>
                                        <img
                                            src={title.gameURL || "placeholder.png"}
                                            alt="Game Image"
                                            className="psn-game-image"
                                        />
                                    </div>

                                    <button
                                        className="toggle-achievements-button"
                                        onClick={() => toggleAchievementsDetail(index, title.gameid)}
                                    >
                                        {loadingTrophiesIndex === index ? "Loading trophies..." : "Game Achievements Details"}
                                    </button>

                                    <div className="psn-trophy-details" id={`details-${index}`}>
                                        <p><strong>Defined Trophies:</strong></p>
                                        <ul>
                                            <li>Platinum: {title.trophyCounts.platinum}</li>
                                            <li>Gold: {title.trophyCounts.gold}</li>
                                            <li>Silver: {title.trophyCounts.silver}</li>
                                            <li>Bronze: {title.trophyCounts.bronze}</li>
                                        </ul>
                                        <p><strong>Earned Trophies:</strong></p>
                                        <ul>
                                            <li>Platinum: {title.earnedCounts.platinum}</li>
                                            <li>Gold: {title.earnedCounts.gold}</li>
                                            <li>Silver: {title.earnedCounts.silver}</li>
                                            <li>Bronze: {title.earnedCounts.bronze}</li>
                                        </ul>
                                        <p><strong>Completion Progress:</strong> {title.progress}%</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trophy Modal */}
                    {selectedGame && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={() => setSelectedGame(null)}>✖</button>
                                <h2 className={"gameTitle"}>{selectedGame.gameName} - Trophies</h2>
                                <img className="game-image" src={selectedGame.gameURL} alt={selectedGame.gameName}/>
                                <ul className="trophy-list">
                                    {selectedGame.earnedTrophies.map((trophy, i) => (
                                        <li key={i} className="trophy-item">
                                            <img src={trophy.imageUrl} alt={trophy.name} className="trophy-icon"/>
                                            <p className={`trophy-${trophy.trophyType.toLowerCase()}`}>
                                                <strong>{trophy.name}</strong> ({trophy.trophyType})
                                            </p>
                                            <p>
                                            {trophy.earned ? (
                                                    <>
                                                        Earned on: {new Date(trophy.earnedDateTime).toLocaleString()}
                                                        <br/>
                                                        {trophy.description}
                                                    </>
                                                ) : (
                                                    "Not earned yet"
                                                )}
                                            </p>

                                            <p>Earned Rate: {trophy.trophyEarnedRate}%</p>
                                            <p>Trophy Rarity: {trophy.trophyRare}%</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PSNComponent;
