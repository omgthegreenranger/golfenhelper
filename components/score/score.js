export function updateScores() {
    const playerScore = player.scores.map((score, i) => {
      if (i === key) {
        return(tempScore)
      }
        
      return(score)
    })
    const playerList = players.map((playName) => {
      if(playName.player == player.player) {
        return({
          player: player.player,
          scores: playerScore}
        )
      } else {
        return({
          player: playName.player,
          scores: playName.scores}
        )
      }
    })
        navigation.navigate("Scoreboard", {
      players: playerList,
      });
    }