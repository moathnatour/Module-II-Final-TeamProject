import { MultiPlayerGame, QuickMatchGame, SinglePlayerGame } from "./model.js"
import {} from "./view.js";

export function onStartGame(boardHeight : number, boardWidth : number, paddleMargin: number){

    const newGame = new SinglePlayerGame(boardHeight, boardWidth, paddleMargin, 3);

    document.addEventListener('keydown' , function(e){
        if (e.key === 'w') {
            newGame.controls.w = true;
            
        }
        if (e.key === 's') {
            newGame.controls.s = true;
        }
        if (e.key === 'ArrowUp') {
            newGame.controls.ArrowUp = true;
        }
        if (e.key === 'ArrowDown') {
            newGame.controls.ArrowDown = true;
        }
    })

    document.addEventListener('keyup' , function(e){
        if (e.key === 'w') {
            newGame.controls.w = false;
        }
        if (e.key === 's') {
            newGame.controls.s = false;
        }
        if (e.key === 'ArrowUp') {
            newGame.controls.ArrowUp = false;
        }
        if (e.key === 'ArrowDown') {
            newGame.controls.ArrowDown = false;
        }
    })

   function startGame(){
    return newGame.startGame();
   }

   function getBall(){
    return newGame.ball;
   }

   function getLeftPaddle(){
    return newGame.leftPaddle;
   }

   function getRightPaddle(){
    return newGame.rightPaddle;
   }

   function checkForGameOver(){
    return newGame.checkForGameOver();
   }

   function getLeftPaddleScore(){
    return newGame.leftPaddleScore;
   }

   function getRightPaddleScore(){
    return newGame.rightPaddleScore;
   }

   function returnWinner(){
    return newGame.returnWinner();
   }

   return { startGame, getBall, getLeftPaddle, getRightPaddle, checkForGameOver, getLeftPaddleScore, getRightPaddleScore, returnWinner}


}
