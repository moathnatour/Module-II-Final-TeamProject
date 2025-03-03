import { bounceBallAround, } from "./controller.js";
import { Paddle } from "./model.js";
export function init(board, startButton) {
    const boardWidth = board.clientWidth;
    const boardHeight = board.clientHeight;
    const ballSize = 20;
    const paddleSize = 100;
    const centerX = (boardWidth - ballSize) / 2;
    const centerY = (boardHeight - ballSize) / 2;
    const leftPaddle = new Paddle(3, 10, boardHeight / 2 - paddleSize / 2, paddleSize);
    const rightPaddle = new Paddle(3, -10, boardHeight / 2 - paddleSize / 2, paddleSize);
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
    ;
    const controls = {
        ArrowUp: false,
        ArrowDown: false,
        w: false,
        s: false,
    };
    document.addEventListener('keydown', function (e) {
        if (e.key === 'w') {
            controls.w = true;
        }
        if (e.key === 's') {
            controls.s = true;
        }
        if (e.key === 'ArrowUp') {
            controls.ArrowUp = true;
        }
        if (e.key === 'ArrowDown') {
            controls.ArrowDown = true;
        }
    });
    document.addEventListener('keyup', function (e) {
        if (e.key === 'w') {
            controls.w = false;
        }
        if (e.key === 's') {
            controls.s = false;
        }
        if (e.key === 'ArrowUp') {
            controls.ArrowUp = false;
        }
        if (e.key === 'ArrowDown') {
            controls.ArrowDown = false;
        }
    });
    function movePaddles() {
        if (controls.w && leftPaddle.yPos > 0) {
            leftPaddle.moveUp();
        }
        if (controls.s && leftPaddle.yPos < (boardHeight - paddleSize)) {
            leftPaddle.moveDown();
        }
        if (controls.ArrowUp && rightPaddle.yPos > 0) {
            rightPaddle.moveUp();
        }
        if (controls.ArrowDown && rightPaddle.yPos < (boardHeight - paddleSize)) {
            rightPaddle.moveDown();
        }
    }
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
        movePaddles();
        updatePaddlePosition();
        updateBallPosition();
        // updatePaddlePosition();
        requestAnimationFrame(gameLoop);
    }
}
