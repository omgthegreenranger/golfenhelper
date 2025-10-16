export function progressHole( players, progress ) {
    console.log("ProgressHole:", players)
    for(let player of players){
      console.log(player)
      if (player.scores[progress] === 0) {
        console.log("Breaking this!", player.player, player.scores[progress])
        break;
      } else {
        console.log("This has a score!")
        return(true)
      }
    }
    return (false)
  }

