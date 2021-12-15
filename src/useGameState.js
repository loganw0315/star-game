import {useEffect, useState} from 'react';
import utils from './utils';

function useGameState(newCandidateNums) {
        const [stars, setStars] = useState(utils.random(1, 9));
        const [availNums, setAvailNums] = useState(utils.range(1, 9));
        const [candidateNums, setCadidateNums] = useState([]);
        const [secondsLeft, setSecondsLeft] = useState(10);
        
        
        useEffect(() => {
          if(secondsLeft > 0 && availNums.length > 0){
            const timerId = setTimeout(() => {
              setSecondsLeft(secondsLeft - 1)
            }, 1000);
            return () => clearTimeout(timerId);
          }
        },);

       

        const setGameState = () => {

            if(utils.sum(newCandidateNums) !== stars){
                setCadidateNums(newCandidateNums);
              } else {
                const newAvailNums = availNums.filter(
                  n => !newCandidateNums.includes(n)
                );
                setStars(utils.randomSumIn(newAvailNums, 9))
                setAvailNums(newAvailNums);
                setCadidateNums([]);
              }
        }
        return {stars, availNums, candidateNums, secondsLeft, setGameState}
}
 
export default useGameState;