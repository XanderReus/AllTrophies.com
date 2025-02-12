const express = require("express");
const cors = require("cors");
const {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getUserTitles,
    getProfileFromUserName,
    getUserTrophiesEarnedForTitle,
} = require("psn-api");
require("dotenv").config(); // Load environment variables from a .env file

const app = express();
const PORT = 3001; // Change the port to avoid conflicts with React's development server

app.use(cors());

// Helper function for detailed error logging
function logError(error, routeName) {
    if (error.response) {
        console.error(`[${routeName}] PSN API Error:`, {
            status: error.response.status,
            data: error.response.data,
        });
    } else {
        console.error(`[${routeName}] Unexpected Error:`, error.message || error);
    }
}

// Route to fetch user profile and games
app.get("/psn-data", async (req, res) => {
    const username = req.query.username; // Retrieve the username from the query parameter
    if (!username) {
        return res.status(400).json({error: "Username is required"});
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
            gameid: title.npCommunicationId,
            trophyCounts: {
                platinum: title.definedTrophies.platinum,
                gold: title.definedTrophies.gold,
                silver: title.definedTrophies.silver,
                bronze: title.definedTrophies.bronze,
            },
            earnedCounts: {
                platinum: title.earnedTrophies.platinum,
                gold: title.earnedTrophies.gold,
                silver: title.earnedTrophies.silver,
                bronze: title.earnedTrophies.bronze,
            },
            gameURL: title.trophyTitleIconUrl,
            progress: title.progress,
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
        logError(error, "/psn-data");
        res.status(500).json({
            error: error.response?.data || error.message || "Unknown error occurred",
        });
    }
});

const {getTitleTrophies} = require("psn-api");

// Fetches the selected games individual trophies
app.get("/psn-trophies", async (req, res) => {
    const {username, npCommunicationId} = req.query;
    if (!username || !npCommunicationId) {
        return res.status(400).json({error: "Username and game ID are required"});
    }

    try {
        const myNpsso = process.env.PSN_NPSSO;
        if (!myNpsso) {
            throw new Error("Missing NPSSO token in environment variables.");
        }

        const accessCode = await exchangeNpssoForCode(myNpsso);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const profileResponse = await getProfileFromUserName(authorization, username);
        const playerId = profileResponse.profile.accountId;

        // Determine the game platform type and options
        const isPS3Game = npCommunicationId.startsWith("NPWR") && parseInt(npCommunicationId.slice(4)) < 10000;
        const isPS4OrPSVitaGame = npCommunicationId.startsWith("NPWR") && parseInt(npCommunicationId.slice(4)) >= 10000 && parseInt(npCommunicationId.slice(4)) < 20000;
        const isPS5Game = !npCommunicationId.startsWith("NPWR") && npCommunicationId.includes("_00");

        const options = isPS3Game || isPS4OrPSVitaGame ? {npServiceName: "trophy"} : {};

        // Fetch earned trophies
        const earnedTrophiesResponse = await getUserTrophiesEarnedForTitle(
            authorization,
            playerId,
            npCommunicationId,
            "all",
            options
        );

        // Fetch full trophy details
        const trophyDetailsResponse = await getTitleTrophies(
            authorization,
            npCommunicationId,
            "all",
            options
        );

        // Merge earned trophies with trophy details
        const trophiesWithDetails = earnedTrophiesResponse.trophies.map(earnedTrophy => {
            const detailedTrophy = trophyDetailsResponse.trophies.find(t => t.trophyId === earnedTrophy.trophyId);
            return {
                trophyId: earnedTrophy.trophyId,
                earned: earnedTrophy.earned,
                earnedDateTime: earnedTrophy.earnedDateTime,
                trophyType: earnedTrophy.trophyType,
                trophyRare: earnedTrophy.trophyRare,
                trophyEarnedRate: earnedTrophy.trophyEarnedRate,
                trophyHidden: earnedTrophy.trophyHidden,
                name: detailedTrophy?.trophyName || "Unknown Trophy",
                description: detailedTrophy?.trophyDetail || "No description available",
                imageUrl: detailedTrophy?.trophyIconUrl || "",
            };
        });

        res.json({trophies: trophiesWithDetails});
    } catch (error) {
        logError(error, "/psn-trophies");
        res.status(500).json({
            error: error.response?.data || error.message || "Unknown error occurred",
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
