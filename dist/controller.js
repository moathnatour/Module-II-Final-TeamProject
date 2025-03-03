import { MultiPlayerGame } from "./model.js";
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
export function startGame(boardHeight, boardWidth, paddleMargin) {
    const newGame = new MultiPlayerGame(boardHeight, boardWidth, paddleMargin);
    document.addEventListener('keydown', function (e) {
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
    });
    document.addEventListener('keyup', function (e) {
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
    });
    function addBall() {
        return newGame.addBall();
    }
    function movePaddles() {
        return newGame.movePaddles();
    }
    function checkForWallColision() {
        return newGame.checkForWallColision();
    }
    function checkForPaddleColision() {
        return newGame.checkForPaddleColision();
    }
    function leftPaddle() {
        return newGame.leftPaddle;
    }
    function rightPaddle() {
        return newGame.rightPaddle;
    }
    function balls() {
        return newGame.balls;
    }
    function moveBalls() {
        for (const ball of newGame.balls) {
            ball.move();
        }
    }
    return {
        addBall, movePaddles, checkForWallColision, checkForPaddleColision, balls, leftPaddle, rightPaddle, moveBalls
    };
}
