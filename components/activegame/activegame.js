import { createContext } from "react";

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


export const ScoringContext = createContext();

const ScoringContextProvider = ({ children }) => {
  const [course, setCourse] = useState([])
  const [activeHole, setActiveHole] = useState(0); // set the hole being chosen
  const [tempScore, setTempScore] = useState(); // temporary chosen score as State
  const [player, setPlayer] = useState(0); // player State - set to one player
  const [gamePlay, setGamePlay] = useState([]); // players list for score
  const [holes, setHoles] = useState([]); // default holes reference list
  const [scoreChange, setScoreChange] = useState(false);
  return (
    <ScoringContext.Provider value={{ 
      course,
      setCourse,
      holes,
      setHoles,
      activeHole,
      setActiveHole,
      tempScore,
      setTempScore,
      player,
      setPlayer,
      gamePlay,
      setGamePlay}}>
      {children}
    </ScoringContext.Provider>
  )
}

export function FinishCheck(gamePlay, player) {
  console.log(player)
  console.log(gamePlay[player])
  console.log(gamePlay[player].scores.every((currentValue) => 0))
return
}