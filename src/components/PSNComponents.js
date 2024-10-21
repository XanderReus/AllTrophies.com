// psncomponent.js
import React from 'react';
import gamesData from '../PS/games.json';
// import {main} from '../PS/GetUserCompleteList.ts'

function GamesList() {
    // const handleClick = () => {
    //     main()
    // }
    return (

        <div>
            <h1>Games List</h1>
            {/*<button onClick={handleClick}>search</button>*/}
            <ul>
                {gamesData.map((game, index) => (  // Add index here
                    <ul key={`${game.gameName}-${index}`}>  {/* Use a combination of gameName and index */}
                        {game.gameName} (Earned
                        Trophies: {game.earnedCounts.bronze + game.earnedCounts.silver + game.earnedCounts.gold + game.earnedCounts.platinum})
                        <br/><br/>
                    </ul>
                ))}
            </ul>
            <footer className="footer">
                <p>&copy; 2024 ACH Database. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default GamesList;
