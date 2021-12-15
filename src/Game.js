import PlayAgain from "./PlayAgain";
import PlayNumber from "./PlayNumber";
import StarsDisplay from "./StarsDisplay";
import useGameState from "./useGameState";
import utils from "./utils";

//Main component of the game, uses imported components to render the main game display and controls logic of win or loss game state
const Game = (props) => {
  const {
    stars,
    availNums,
    candidateNums,
    secondsLeft,
    setGameState
  } = useGameState();

  //Checks if selected numbers are wrong
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  //Checks if game is won or lost
  const gameStatus = availNums.length === 0
    ? 'won'
    : secondsLeft === 0 ? 'lost' : 'active';
  //Checks the states of individual numbers
  const numberStatus = number => {
    //if the number is used 
    if(!availNums.includes(number)) {
      return 'used';
    }

    if(candidateNums.includes(number)){
      return candidatesAreWrong ? 'wrong': 'candidate'
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    
    if(gameStatus !=='active' ||  currentStatus === 'used'){
      return;
    }

  
   setGameState(number, currentStatus);
  };

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus !== 'active' ? (
            <PlayAgain onClickHandler={props.startNewGame} gameStatus={gameStatus}/>
          ) : (
            <StarsDisplay stars={stars} utilRange={utils.range}/>
          )}
        </div>
        <div className="right">
          {utils.range(1, 9).map(number =>
            <PlayNumber 
              key={number} 
              number={number} 
              status={numberStatus(number)}
              colors={colors}
              onClick={onNumberClick}
            /> 
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};





// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science


export default Game;
