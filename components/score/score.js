export function updateScores(player, players, tempScore) {
  console.log("Temp Score:", tempScore, players, player.scores )
    players[player].scores[tempScore.key] = tempScore.score;
    // const playerList = players.map((playName) => {
    //   if(playName.player == player.player) {
    //     return({
    //       player: player.player,
    //       scores: playerScore}
    //     )
    //   } else {
    //     return({
    //       player: playName.player,
    //       scores: playName.scores}
    //     )
    //   }
    // })
    return players
  }