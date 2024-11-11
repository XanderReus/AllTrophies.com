//GetUserCompleteList.ts
import * as  fs from "fs";

import type {Trophy} from "psn-api";
import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    getTitleTrophies,
    getUserTitles,
    getUserTrophiesEarnedForTitle,
    makeUniversalSearch,
    TrophyRarity
} from "psn-api";
import 'dotenv/config'

async function main() {
    // 1. Authenticate and become authorized with PSN.
    // See the Authenticating Manually docs for how to get your NPSSO.
    const accessCode = await exchangeNpssoForCode(process.env.NPSSO_TOKEN);
    const authorization = await exchangeCodeForAccessToken(accessCode);

// 2. Get the user's `accountId` from the username.
    const allAccountsSearchResults = await makeUniversalSearch(
        authorization,
        "rob915ert",
        "SocialAllAccounts"
    );

    const targetAccountId = allAccountsSearchResults?.domainResponses?.[0]?.results?.[0]?.socialMetadata?.accountId;

    if (!targetAccountId) {
        console.error('Error: Account ID not found in the response.');
        return; // Exit early if Account ID is not found
    }

    console.log("Target Account ID:", targetAccountId);

// 3. Get the user's list of titles (games).
    const userTitlesResponse = await getUserTitles(authorization, targetAccountId);
    console.log("User Titles Response:", userTitlesResponse);

    const {trophyTitles} = userTitlesResponse || {}; // Check if userTitlesResponse exists
    if (!trophyTitles || !Array.isArray(trophyTitles)) {
        console.error("Error: trophyTitles is not an array or doesn't exist.");
        return; // Exit early if trophyTitles is not iterable
    }

    console.log("Trophy Titles:", trophyTitles);
    const games: any[] = [];
    for (const title of trophyTitles) {
        // 4. Get the list of trophies for each of the user's titles.
        try {
            const {trophies: titleTrophies} = await getTitleTrophies(
                authorization,
                title.npCommunicationId,
                "all",
                {
                    npServiceName:
                        title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
                }
            );


            // 5. Get the list of _earned_ trophies for each of the user's titles.
            const {trophies: earnedTrophies} = await getUserTrophiesEarnedForTitle(
                authorization,
                targetAccountId,
                title.npCommunicationId,
                "all",
                {
                    npServiceName:
                        title.trophyTitlePlatform !== "PS5" ? "trophy" : undefined
                }
            );

            // 6. Merge the two trophy lists.
            const mergedTrophies = mergeTrophyLists(titleTrophies, earnedTrophies);

            games.push({
                gameName: title.trophyTitleName,
                platform: title.trophyTitlePlatform,
                trophyTypeCounts: title.definedTrophies,
                earnedCounts: title.earnedTrophies,
                trophyList: mergedTrophies,
                gameURL: title.trophyTitleIconUrl
            });
        } catch (error) {
            console.error(`Failed to fetch trophies for ${title.trophyTitleName}:`, error.message);
        }
    }
    // 7. Write to a JSON file.
    const fs = require('fs');
    fs.writeFileSync("./games.json", JSON.stringify(games, null, 2));
}

const mergeTrophyLists = (
    titleTrophies: Trophy[],
    earnedTrophies: Trophy[]
) => {
    const mergedTrophies: any[] = [];

    for (const earnedTrophy of earnedTrophies) {
        const foundTitleTrophy = titleTrophies.find(
            (t) => t.trophyId === earnedTrophy.trophyId
        );

        mergedTrophies.push(
            normalizeTrophy({...earnedTrophy, ...foundTitleTrophy})
        );
    }

    return mergedTrophies;
};

const normalizeTrophy = (trophy: Trophy) => {
    return {
        isEarned: trophy.earned ?? false,
        earnedOn: trophy.earned ? trophy.earnedDateTime : "unearned",
        type: trophy.trophyType,
        rarity: rarityMap[trophy.trophyRare ?? 0],
        earnedRate: Number(trophy.trophyEarnedRate),
        trophyName: trophy.trophyName,
        groupId: trophy.trophyGroupId
    };
};

const rarityMap: Record<TrophyRarity, string> = {
    [TrophyRarity.VeryRare]: "Very Rare",
    [TrophyRarity.UltraRare]: "Ultra Rare",
    [TrophyRarity.Rare]: "Rare" ,
    [TrophyRarity.Common]: "Common"
};

export default main();