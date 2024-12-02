const express = require("express");
const cors = require("cors");
const {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
    makeUniversalSearch,
    getProfileFromUserName,
} = require("psn-api");
require("dotenv").config(); // Load environment variables from a .env file

const app = express();
const PORT = 3001; // Change the port to avoid conflicts with React's development server

app.use(cors());

app.get("/psn-data", async (req, res) => {
    const username = req.query.username; // Retrieve the username from the query parameter
    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const myNpsso = process.env.PSN_NPSSO; // Load NPSSO from environment variables
        if (!myNpsso) {
            throw new Error("Missing NPSSO token in environment variables.");
        }

        const accessCode = await exchangeNpssoForCode(myNpsso);
        const authorization = await exchangeCodeForAccessToken(accessCode);

        // Fetch profile info
        const profileResponse = await getProfileFromUserName(authorization, username);
        const playerId = profileResponse.profile.accountId;

        // Fetch user trophies
        const userTitlesResponse = await getUserTitles(authorization, playerId);

        // Map user titles to a simplified format
        const userTitles = userTitlesResponse.trophyTitles.map((title) => ({
            gameName: title.trophyTitleName,
            platform: title.trophyTitlePlatform,
            trophyCounts: {
                bronze: title.definedTrophies.bronze,
                silver: title.definedTrophies.silver,
                gold: title.definedTrophies.gold,
                platinum: title.definedTrophies.platinum,
            },
            earnedCounts: {
                bronze: title.earnedTrophies.bronze,
                silver: title.earnedTrophies.silver,
                gold: title.earnedTrophies.gold,
                platinum: title.earnedTrophies.platinum,
            },
            gameURL: title.trophyTitleIconUrl,
        }));

        // Send structured response to frontend
        res.json({
            profile: {
                username: profileResponse.profile.onlineId,
                avatarUrl: profileResponse.profile.avatarUrls[0]?.avatarUrl, // Use the first avatar URL
            },
            userTitles,
        });
    } catch (error) {
        console.error("Error in /psn-data route:", error.message || error);
        res.status(500).json({
            error: error.response?.data || error.message || "Unknown error occurred",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
