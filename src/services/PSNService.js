// psnservice.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
    getUserTrophiesEarnedForTitle,
    makeUniversalSearch,
    TrophyRarity
} from 'psn-api';
import 'dotenv/config';

const app = express();
app.use(cors()); // Allow React frontend to access this API

// Endpoint to get games data from games.json
app.get('/api/games', (req, res) => {
    const filePath = path.resolve('src', 'PS', 'games.json'); // Adjust the path as necessary

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading games.json:', err);
            return res.status(500).json({ error: 'Error reading games data' });
        }
        try {
            const games = JSON.parse(data);
            res.json(games);
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ error: 'Error parsing games data' });
        }
    });
});

// Start your server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
