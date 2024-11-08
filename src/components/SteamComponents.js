import React, { useState, useEffect } from 'react';
import { getPlayerAchievements, getOwnedGames, getPlayerSummary } from '../services/steamService';

const SteamComponents = ({ steamid, setSteamId }) => {
    const [achievements, setAchievements] = useState([]);
    const [games, setGames] = useState([]);
    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const appid = '252490'; // Replace with the actual App ID

    useEffect(() => {
        // Optional: Set the steamId if needed in the parent component
        if (!steamid) {
            setSteamId('76561198239999462'); // Set the steamId in the parent component
        }

        const fetchData = async () => {
            try {
                const achievementsResponse = await getPlayerAchievements(steamid || '76561198239999462', appid);
                if (achievementsResponse && achievementsResponse.achievements) {
                    setAchievements(achievementsResponse.achievements);
                } else {
                    console.log('No achievements found in response');
                }

                const gamesResponse = await getOwnedGames(steamid || '76561198239999462');
                if (gamesResponse.data && gamesResponse.data.response && gamesResponse.data.response.games) {
                    setGames(gamesResponse.data.response.games);
                }

                const playerResponse = await getPlayerSummary(steamid || '76561198239999462');
                if (playerResponse.data && playerResponse.data.response && playerResponse.data.response.players) {
                    setPlayer(playerResponse.data.response.players[0]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [steamid, appid, setSteamId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString(); // Format date and time
    };

    return (
        <div>
            {player && (
                <div>
                    <h1>{player.personaname}</h1>
                    <img src={player.avatarfull} alt={player.personaname} style={{ width: '100px', borderRadius: '50%' }} />
                </div>
            )}
            <h2>Owned Games</h2>
            <ul>
                {games.map(game => (
                    <li key={game.appid}>
                        <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`} alt={game.name} style={{ width: '50px', height: 'auto' }} />
                        <p>{game.name}</p>
                    </li>
                ))}
            </ul>
            <h2>Achievements</h2>
            <ul>
                {achievements.map(achievement => (
                    <li key={achievement.apiname} style={{ listStyleType: 'none', marginBottom: '20px' }}>
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
        </div>
    );
};

export default SteamComponents;
