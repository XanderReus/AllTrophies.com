// src/services/steamService.js
import axios from 'axios';
import { STEAM_API_KEY } from '../config';
import './steamService.css'
const STEAM_API_URL = '/api';

// src/services/steamService.js


export const getPlayerAchievements = async (steamid, appid) => {
    try {
        // Fetch player's achievements
        const response = await axios.get(`${STEAM_API_URL}/ISteamUserStats/GetPlayerAchievements/v1/`, {
            params: {
                key: STEAM_API_KEY,
                steamid: steamid,
                appid: appid
            }
        });

        // Fetch detailed achievement information
        const achievementDetailsResponse = await axios.get(`${STEAM_API_URL}/ISteamUserStats/GetSchemaForGame/v2/`, {
            params: {
                key: STEAM_API_KEY,
                appid: appid
            }
        });

        const achievements = response.data.playerstats.achievements;
        const schema = achievementDetailsResponse.data.game.availableGameStats.achievements;

        console.log('Achievements:', achievements);
        console.log('Schema:', schema);

        // Map detailed achievement info to the player achievements
        const detailedAchievements = achievements.map(achievement => {
            const detail = schema.find(a => a.name === achievement.apiname);
            return {
                ...achievement,
                displayName: detail ? detail.displayName : achievement.apiname,
                description: detail ? detail.description : 'No description available',
                icon: detail ? detail.icon : null,
                icongray: detail ? detail.icongray : null
            };
        });

        console.log('Detailed Achievements:', detailedAchievements);

        return { achievements: detailedAchievements };
    } catch (error) {
        console.error('Error fetching player achievements:', error);
        throw error;
    }
};


export const getOwnedGames = (steamid) => {
    return axios.get(`${STEAM_API_URL}/IPlayerService/GetOwnedGames/v1/`, {
        params: {
            key: STEAM_API_KEY,
            steamid: steamid,
            include_appinfo: true,
            include_played_free_games: true
        }
    });
};

export const getPlayerSummary = (steamid) => {
    return axios.get(`${STEAM_API_URL}/ISteamUser/GetPlayerSummaries/v2/`, {
        params: {
            key: STEAM_API_KEY,
            steamids: steamid
        }
    });
};
