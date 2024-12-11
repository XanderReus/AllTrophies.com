import React, {useState} from "react";
import "../HTML/CSS/test.css"; // Ensure this is the correct path to your CSS file.

const PSNComponent = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/psn-data?username=${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    const hasPlatinum = (earnedCounts) => earnedCounts?.platinum > 0;

    const calculateTrophyCount = (earnedCounts) => {
        return Object.values(earnedCounts || {}).reduce((total, count) => total + count, 0);
    };

    const toggleDetails = (index) => {
        const detailsDiv = document.getElementById(`details-${index}`);
        detailsDiv.classList.toggle("show");
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
                            src={userData.profile.avatarUrl || "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg"}
                            alt="Profile Avatar"
                            className="psn-profile-avatar"
                        />
                        <h2 className="psn-profile-username">
                            {userData.profile.username || "Unknown User"}
                        </h2>
                    </div>

                    <div className="psn-achievements-container">
                        {userData.userTitles.map((title, index) => {
                            const trophyCount = calculateTrophyCount(title.earnedCounts);
                            const trophyTypeCounts = formatTrophies(title.trophyCounts);
                            const earnedCounts = formatTrophies(title.earnedCounts);

                            return (
                                <div key={index} className="games-container">
                                    <div
                                        className="psn-achievement-header"
                                        onClick={() => toggleDetails(index)}
                                    >
                                        <div className="psn-achievement-info">
                                            <h3>{title.gameName || "Unknown Game"}</h3>
                                            <p>
                                                {trophyCount} trophies earned
                                                {hasPlatinum(title.earnedCounts) && (
                                                    <img
                                                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fb9cfb5b-aa09-4dc2-b19b-931576776dae/de4fujh-3cf64804-b0b2-4d1a-8f60-928f1ddeb575.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZiOWNmYjViLWFhMDktNGRjMi1iMTliLTkzMTU3Njc3NmRhZVwvZGU0ZnVqaC0zY2Y2NDgwNC1iMGIyLTRkMWEtOGY2MC05MjhmMWRkZWI1NzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5T7yYnOROSIYA5UVeNWHfc-lfC5EcBmAbgtnGzXv5Pc"
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
                                    <div
                                        className="psn-trophy-details"
                                        id={`details-${index}`}
                                    >
                                        <p>
                                            <strong>Trophies Defined:</strong>
                                        </p>
                                        <strong>
                                            <ul>
                                                <li>Platinum: {title.trophyCounts.platinum}</li>
                                                <li>Gold: {title.trophyCounts.gold}</li>
                                                <li>Silver: {title.trophyCounts.silver}</li>
                                                <li>Bronze: {title.trophyCounts.bronze}</li>
                                            </ul>
                                        </strong>
                                        <p>
                                            <strong>Trophies Earned:</strong>
                                        </p>
                                        <strong>
                                            <ul>
                                                <li>Platinum: {title.earnedCounts.platinum}</li>
                                                <li>Gold: {title.earnedCounts.gold}</li>
                                                <li>Silver: {title.earnedCounts.silver}</li>
                                                <li>Bronze: {title.earnedCounts.bronze}</li>
                                            </ul>
                                        </strong>
                                    <strong>Percentage of trophies: {title.progress}%</strong></div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}
        </div>
    );
};

export default PSNComponent;
