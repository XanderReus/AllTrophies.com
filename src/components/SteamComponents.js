import React, { useState, useEffect } from 'react';
import { getPlayerAchievements, getOwnedGames, getPlayerSummary } from '../services/steamService';
import '../HTML/CSS/SteamComp.css';

const SteamComponents = ({ steamid, setSteamId }) => {
    const [achievements, setAchievements] = useState([]);
    const [games, setGames] = useState([]);
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedGame, setSelectedGame] = useState(null);
    const [sortOption, setSortOption] = useState('hours'); // Default sorting option
    const [achievementSortOption, setAchievementSortOption] = useState('unlocked'); // Default achievement sort option

    useEffect(() => {
        if (!steamid) {
            setSteamId('');
        }

        const fetchData = async () => {
            try {
                const gamesResponse = await getOwnedGames(steamid || '');
                if (gamesResponse.data?.response?.games) {
                    const gamesList = gamesResponse.data.response.games;

                    const updatedGames = await Promise.all(
                        gamesList.map(async (game) => {
                            try {
                                const achievementsResponse = await getPlayerAchievements(steamid || '', game.appid);
                                if (achievementsResponse?.achievements) {
                                    const totalAchievements = achievementsResponse.achievements.length;
                                    const unlockedAchievements = achievementsResponse.achievements.filter(
                                        (ach) => ach.achieved === 1
                                    ).length;

                                    const achievementPercentage =
                                        totalAchievements > 0
                                            ? parseFloat(((unlockedAchievements / totalAchievements) * 100).toFixed(2))
                                            : 0;

                                    return { ...game, achievementPercentage };
                                }
                                return { ...game, achievementPercentage: 0 }; // Default 0% if no achievements found
                            } catch (error) {
                                console.error(`Error fetching achievements for game ${game.name}:`, error);
                                return { ...game, achievementPercentage: 0 }; // Default 0% on error
                            }
                        })
                    );

                    setGames(updatedGames);

                    // Automatically select the first game as default
                    if (updatedGames.length > 0) {
                        setSelectedGame(updatedGames[0].appid);
                    }
                }

                const playerResponse = await getPlayerSummary(steamid || '');
                if (playerResponse.data?.response?.players) {
                    setPlayer(playerResponse.data.response.players[0]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [steamid, setSteamId]);

    useEffect(() => {
        const fetchAchievements = async () => {
            if (selectedGame) {
                try {
                    const achievementsResponse = await getPlayerAchievements(steamid || '', selectedGame);
                    if (achievementsResponse?.achievements) {
                        setAchievements(achievementsResponse.achievements);
                    } else {
                        setAchievements([]);
                    }
                } catch (error) {
                    console.error('Error fetching achievements:', error);
                    setAchievements([]);
                }
            }
        };

        fetchAchievements();
    }, [steamid, selectedGame]);

    const sortGames = (games) => {
        switch (sortOption) {
            case 'hours':
                return [...games].sort((a, b) => b.playtime_forever - a.playtime_forever);
            case 'alphabetical':
                return [...games].sort((a, b) => a.name.localeCompare(b.name));
            case 'achievementPercentage':
                return [...games].sort((a, b) => (b.achievementPercentage || 0) - (a.achievementPercentage || 0));
            default:
                return games;
        }
    };

    const sortAchievements = (achievements) => {
        switch (achievementSortOption) {
            case 'unlocked':
                return [...achievements].sort((a, b) => b.achieved - a.achieved); // Achieved first
            case 'time':
                return [...achievements].sort((a, b) => (b.unlocktime || 0) - (a.unlocktime || 0)); // Most recently unlocked first
            default:
                return achievements;
        }
    };

    const scrollToClass = () => {
        const element = document.querySelector('.achievements-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            console.log('Element with class "achievements-list" not found.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    return (
        <div className="steam-container">
            {player && (
                <div className="player-info">
                    <h2>{player.personaname}</h2>
                    <img className="player-avatar" src={player.avatarfull} alt={player.personaname} />
                </div>
            )}

            {games.length > 0 && (
                <>
                    <div className="d-flex justify-content-center align-items-center my-4">
                        <div>
                            <label htmlFor="sortSelect" className="form-label text-center mb-2 h5">Sort Games by:</label>
                            <select
                                id="sortSelect"
                                className="form-select text-center"
                                style={{ width: '250px', fontSize: '18px' }}
                                onChange={(e) => setSortOption(e.target.value)}
                                value={sortOption}
                            >
                                <option value="hours">Most Hours Played</option>
                                <option value="alphabetical">Alphabetical</option>
                                <option value="achievementPercentage">Most % Achievements Earned</option>
                            </select>
                        </div>
                    </div>

                    <div className="stTitleName"><h2>Owned Games</h2></div>
                    <div className="games-container-st">
                        {sortGames(games).map((game) => (
                            <div
                                key={game.appid}
                                className={`game-card ${selectedGame === game.appid ? 'selected' : ''}`}
                                onClick={() => {
                                    setSelectedGame(game.appid);
                                    scrollToClass();
                                }}
                            >
                                <img
                                    className="game-image"
                                    src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                                    alt={game.name}
                                />
                                <p className="game-name">{game.name}</p>
                                <p>Hours Played: {(game.playtime_forever / 60).toFixed(1)} hrs</p>
                                <p>Achievements: {game.achievementPercentage.toFixed(1)}%</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {achievements.length > 0 && (
                <>
                    <div className="d-flex justify-content-center align-items-center my-4">
                        <div>
                            <label htmlFor="achievementSortSelect" className="form-label text-center mb-2 h5">Sort Achievements by:</label>
                            <select
                                id="achievementSortSelect"
                                className="form-select text-center"
                                style={{ fontSize: '18px',}}
                                onChange={(e) => setAchievementSortOption(e.target.value)}
                                value={achievementSortOption}
                            >
                                <option value="unlocked">Unlocked Status</option>
                                <option value="time">Time of Unlocking</option>
                            </select>
                        </div>
                    </div>

                    <div className="stTitleName"><h2>Achievements</h2></div>
                    <ul className="achievements-list">
                        {sortAchievements(achievements).map((achievement) => (
                            <li key={achievement.apiname} className="achievement-item">
                                <img
                                    src={achievement.achieved === 1 ? achievement.icon : achievement.icongray}
                                    alt={`${achievement.displayName} icon`}
                                />
                                <div>
                                    <strong>{achievement.displayName}</strong>
                                    <p>{achievement.description}</p>
                                    {achievement.achieved === 1 ? (
                                        <p>Achieved on: {formatDate(achievement.unlocktime)}</p>
                                    ) : (
                                        <p>Not achieved yet</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {achievements.length === 0 && !selectedGame && !loading && (
                <p>No achievements to display for the selected game.</p>
            )}
        </div>
    );
};

export default SteamComponents;
