import { onStartGame } from "./controller.js";
export function renderGame(board, startButton, leftBoard, rightBoard) {
    const boardHeight = board.clientHeight;
    const boardWidth = board.clientWidth;
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
    }
    function announceWinner() {
        const resultDsiplay = document.createElement('div');
        resultDsiplay.classList.add('result-display');
        const asd = returnWinner()[0];
        const newHeight = returnWinner()[1];
        const newWidth = returnWinner()[2];
        board.innerHTML = '';
        if (typeof asd === "string") {
            resultDsiplay.innerHTML = asd;
        }
        if (typeof newHeight === "number") {
            board.style.height = `${newHeight}px`;
        }
        if (typeof newWidth === "number") {
            board.style.width = `${newWidth}px`;
        }
        document.body.appendChild(resultDsiplay);
    }
    function gameLoop() {
        startGame();
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
