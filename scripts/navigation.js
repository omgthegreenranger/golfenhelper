  export function changeScreen(hole, index, player, players) {
    navigation.navigate("Score", {
      hole: hole,
      key: index,
      player: player,
      players: players,
    });
  }