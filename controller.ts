import { MultiPlayerGame, QuickMatchGame, SinglePlayerGame } from "./model.js"
import {} from "./view.js"

// export function bounceBallAround(speed: number, speedMultiplier: number, size: number, xPos: number, yPos: number) {

//     const newBall = new Ball(speed, size, xPos, yPos);

//     function moveBall() {
//         newBall.move()
//     }

//     function getYPosition() {
//         return newBall.yPos
//     }

//     function getXPosition() {
//         return newBall.xPos
//     }

//     function changeXDirection() {
//         newBall.changeXDirection();
//     }

//     function changeYDirection() {
//         newBall.changeYDirection();
//     }

//     function getYSpeed() {
//         return newBall.ySpeed;
//     }

//     function getXSpeed(){
//         return newBall.xSpeed;
//     }

//     function getSize(){
//         return newBall.size;
//     }

//     return { moveBall, getYPosition, getXPosition, changeXDirection, changeYDirection, getYSpeed, getXSpeed, getSize };

// }

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



    // function movePaddles(){
    //     return newGame.movePaddles()
    // }

    // function checkForWallColision(){
    //     return newGame.checkForWallColision();
    // }

    // function checkForPaddleColision(){
    //     return newGame.checkForPaddleColision()
    // }

    // function leftPaddle(){
    //     return newGame.leftPaddle;
    // }

    // function rightPaddle(){
    //     return newGame.rightPaddle
    // }

    // function ball(){
    //      return newGame.ball
    // }

    // function moveBalls(){
        
    //         newGame.ball.move();
        
    // }

    // return {
    //      movePaddles, checkForWallColision, checkForPaddleColision, ball, leftPaddle, rightPaddle, moveBalls
    // }
}
