import { bounceBallAround, } from "./controller.js";
import { Paddle } from "./model.js";
export function init(board, startButton) {
    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;
    const ballSize = 20;
    const paddleSize = 100;
    const centerX = (boardWidth - ballSize) / 2;
    const centerY = (boardHeight - ballSize) / 2;
    const leftPaddle = new Paddle(10, 10, boardHeight / 2 - paddleSize / 2, paddleSize);
    const rightPaddle = new Paddle(10, -10, boardHeight / 2 - paddleSize / 2, paddleSize);
    const firstPlayer = document.createElement("div");
    firstPlayer.classList.add('paddle');
    firstPlayer.style.top = `${leftPaddle.yPos}px`;
    firstPlayer.style.left = `${5}px`;
    firstPlayer.style.height = `${leftPaddle.size}px`;
    board.appendChild(firstPlayer);
    const secondPlayer = document.createElement('div');
    secondPlayer.classList.add('paddle');
    secondPlayer.style.top = `${rightPaddle.yPos}px`;
    secondPlayer.style.left = `${790}px`;
    secondPlayer.style.height = `${rightPaddle.size}px`;
    board.appendChild(secondPlayer);
    function updatePaddlePosition() {
        firstPlayer.style.top = `${leftPaddle.yPos}px`;
        secondPlayer.style.top = `${rightPaddle.yPos}px`;
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'w' && leftPaddle.yPos > 0) {
            leftPaddle.moveUp();
            updatePaddlePosition();
        }
        if (e.key === 's' && leftPaddle.yPos < (boardHeight - paddleSize)) {
            leftPaddle.moveDown();
            updatePaddlePosition();
        }
        if (e.key === 'ArrowUp' && rightPaddle.yPos > 0) {
            rightPaddle.moveUp();
            updatePaddlePosition();
        }
        if (e.key === 'ArrowDown' && rightPaddle.yPos < (boardHeight - paddleSize)) {
            rightPaddle.moveDown();
            updatePaddlePosition();
        }
    });
    const { moveBall, getYPosition, getXPosition, changeXDirection, changeYDirection, getySpeeds } = bounceBallAround(1, 2, ballSize, centerX, centerY);
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.width = `${ballSize}px`;
    ball.style.left = `${centerX}px`;
    ball.style.top = `${centerY}px`;
    board.appendChild(ball);
    startButton.addEventListener('click', function (e) {
        e.preventDefault();
        gameLoop();
    });
    function updateBallPosition() {
        ball.style.left = `${getXPosition()}px`;
        ball.style.top = `${getYPosition()}px`;
        if (getXPosition() >= (board.clientWidth - ballSize) || getXPosition() <= 0) {
            changeXDirection();
        }
        if (getYPosition() >= (board.clientHeight - ballSize) || getYPosition() <= 0) {
            changeYDirection();
        }
    }
    function gameLoop() {
        moveBall();
        updateBallPosition();
        requestAnimationFrame(gameLoop);
    }
}
