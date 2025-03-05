import { onStartGame } from "./controller.js";
// import { Paddle, } from "./model.js"
// export function playGame(board: HTMLElement, startButton: HTMLButtonElement) {
//     const boardWidth = board.clientWidth;
//     const boardHeight = board.clientHeight;
// const ballSize = 20;
// const paddleSize = 100;
// const centerX = (boardWidth - ballSize) / 2;
// const centerY = (boardHeight - ballSize) / 2;
// const leftPaddle = new Paddle(2, 10, boardHeight / 2 - paddleSize / 2, paddleSize);
// const rightPaddle = new Paddle(2, 790, boardHeight / 2 - paddleSize / 2, paddleSize);
// const firstPlayer = document.createElement("div");
// firstPlayer.classList.add('paddle');
// firstPlayer.style.top = `${leftPaddle.yPos}px`;
// firstPlayer.style.left = `${5}px`;
// firstPlayer.style.height = `${leftPaddle.size}px`
// board.appendChild(firstPlayer);
// const secondPlayer = document.createElement('div');
// secondPlayer.classList.add('paddle');
// secondPlayer.style.top = `${rightPaddle.yPos}px`;
// secondPlayer.style.left = `${790}px`;
// secondPlayer.style.height = `${rightPaddle.size}px`
// board.appendChild(secondPlayer);
// function updatePaddlePosition() {
//     firstPlayer.style.top = `${leftPaddle.yPos}px`;
//     secondPlayer.style.top = `${rightPaddle.yPos}px`
// console.log(secondPlayer.style.top, rightPaddle.yPos)
// };
// const controls = {
//     ArrowUp: false,
//     ArrowDown: false,
//     w: false,
//     s: false,
// };
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'w') {
//         controls.w = true;
//     }
//     if (e.key === 's') {
//         controls.s = true;
//     }
//     if (e.key === 'ArrowUp') {
//         controls.ArrowUp = true;
//     }
//     if (e.key === 'ArrowDown') {
//         controls.ArrowDown = true;
//     }
// })
// document.addEventListener('keyup', function (e) {
//     if (e.key === 'w') {
//         controls.w = false;
//     }
//     if (e.key === 's') {
//         controls.s = false;
//     }
//     if (e.key === 'ArrowUp') {
//         controls.ArrowUp = false;
//     }
//     if (e.key === 'ArrowDown') {
//         controls.ArrowDown = false;
//     }
// })
//     function movePaddles() {
//         if (controls.w && leftPaddle.yPos > 0) {
//             leftPaddle.moveUp();
//         }
//         if (controls.s && leftPaddle.yPos < (boardHeight - paddleSize)) {
//             leftPaddle.moveDown();
//         }
//         if (controls.ArrowUp && rightPaddle.yPos > 0) {
//             rightPaddle.moveUp();
//         }
//         if (controls.ArrowDown && rightPaddle.yPos < (boardHeight - paddleSize)) {
//             rightPaddle.moveDown();
//         }
// updatePaddlePosition();
//     }
// const { moveBall, getYPosition, getXPosition, changeXDirection, changeYDirection, getYSpeed, getXSpeed, getSize } =
//     bounceBallAround(1, 2, ballSize, centerX, centerY);
// const ball = document.createElement('div');
// ball.classList.add('ball');
// ball.style.width = `${ballSize}px`;
// ball.style.left = `${centerX}px`;
// ball.style.top = `${centerY}px`;
// board.appendChild(ball);
// startButton.addEventListener('click', function (e) {
//     e.preventDefault();
//     // gameLoop();
// })
// function updateBallPosition() {
//     ball.style.left = `${getXPosition()}px`;
//     ball.style.top = `${getYPosition()}px`;
//     if (getXPosition() === (leftPaddle.xPos) && ((getYPosition() > leftPaddle.getPosition()) && (getYPosition() < leftPaddle.getPosition() + leftPaddle.size ))  ) {
//         changeXDirection();
//     }
//     if((getXPosition() + ballSize) === (rightPaddle.xPos) && ((getYPosition() > rightPaddle.getPosition()) && (getYPosition() < rightPaddle.getPosition() + rightPaddle.size))) {
//         changeXDirection();
//     }
//     if (getYPosition() >= (board.clientHeight - ballSize) || getYPosition() <= 0) {
//         changeYDirection();
//     }
// }
// function gameLoop() {
//     moveBall();
//     movePaddles();
//     updateBallPosition();
//     requestAnimationFrame(gameLoop);
// }
// }
export function renderGame(board, startButton, leftBoard, rightBoard) {
    const boardHeight = board.clientHeight;
    const boardWidth = board.clientWidth;
    // const {  movePaddles, checkForWallColision, checkForPaddleColision , leftPaddle, rightPaddle , ball, moveBalls} = 
    // onStartGame(boardHeight, boardWidth, 5);
    const { startGame, getBall, getLeftPaddle, getRightPaddle, checkForGameOver, getLeftPaddleScore, getRightPaddleScore, returnWinner } = onStartGame(boardHeight, boardWidth, 5);
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.bottom = `${getBall().getYPosition()}px`;
    ball.style.left = `${getBall().getXPosition()}px`;
    board.appendChild(ball);
    const firstPlayer = document.createElement('div');
    firstPlayer.classList.add('paddle');
    firstPlayer.style.bottom = `${getLeftPaddle().yPos}px`;
    firstPlayer.style.left = `${getLeftPaddle().xPos}px`;
    firstPlayer.style.height = `${getLeftPaddle().size}px`;
    board.appendChild(firstPlayer);
    const secondPlayer = document.createElement('div');
    secondPlayer.classList.add('paddle');
    secondPlayer.style.bottom = `${getRightPaddle().yPos}px`;
    secondPlayer.style.left = `${getRightPaddle().xPos}px`;
    secondPlayer.style.height = `${getRightPaddle().size}px`;
    board.appendChild(secondPlayer);
    function updateBoard() {
        ball.style.bottom = `${getBall().getYPosition()}px`;
        ball.style.left = `${getBall().getXPosition()}px`;
        firstPlayer.style.bottom = `${getLeftPaddle().yPos}px`;
        firstPlayer.style.left = `${getLeftPaddle().xPos}px`;
        firstPlayer.style.height = `${getLeftPaddle().size}px`;
        secondPlayer.style.bottom = `${getRightPaddle().yPos}px`;
        secondPlayer.style.left = `${getRightPaddle().xPos}px`;
        secondPlayer.style.height = `${getRightPaddle().size}px`;
        leftBoard.innerHTML = getLeftPaddleScore().toString();
        rightBoard.innerHTML = getRightPaddleScore().toString();
        console.log('board updated');
    }
    function announceWinner() {
        const resultDsiplay = document.createElement('div');
        resultDsiplay.classList.add('result-display');
        resultDsiplay.innerHTML = returnWinner();
        board.appendChild(resultDsiplay);
    }
    // const asd = ball();
    // const ballElement =  document.createElement('div');
    // ballElement.classList.add('ball')
    // ballElement.style.top = `${asd.getYPosition()}px`;
    // ballElement.style.left = `${asd.getXPosition()}px`;
    // board.appendChild(ballElement);
    // function updatePaddles(){
    //     firstPlayer.style.bottom = `${leftPaddle().yPos}px`;
    //     firstPlayer.style.left = `${leftPaddle().xPos}px`;
    //     firstPlayer.style.height = `${leftPaddle().size}px`;
    //     secondPlayer.style.bottom = `${rightPaddle().yPos}px`;
    //     secondPlayer.style.left = `${rightPaddle().xPos}px`
    //     secondPlayer.style.height = `${rightPaddle().size}px`
    //   }
    //   function updateBallPosition(){
    //     ballElement.style.top = `${asd.getYPosition()}px`;
    // ballElement.style.left = `${asd.getXPosition()}px`;
    //   }
    async function gameLoop() {
        // moveBalls();
        // updateBallPosition();
        // movePaddles();
        // updatePaddles();
        // checkForWallColision();
        // checkForPaddleColision();
        startGame();
        //   setTimeout(()=>startGame(), 1000)
        updateBoard();
        if (!checkForGameOver()) {
            requestAnimationFrame(gameLoop);
        }
        else {
            announceWinner();
        }
    }
    requestAnimationFrame(gameLoop);
}
