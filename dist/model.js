export class Ball {
    constructor(speed, size, xPos, yPos) {
        this.xPos = 50;
        this.yPos = 50;
        this.size = size;
        this.xPos = xPos;
        this.yPos = yPos;
        this.randomizeInitialDirection(speed);
    }
    changeXDirection() {
        this.xSpeed = this.xSpeed * -1;
    }
    changeYDirection() {
        this.ySpeed = this.ySpeed * -1;
    }
    randomizeInitialDirection(speed) {
        const xSpeedDirection = Math.floor(Math.random() * 2);
        const ySpeedDirection = Math.floor(Math.random() * 2);
        switch (xSpeedDirection) {
            case 0:
                this.xSpeed = speed;
                break;
            case 1:
                this.xSpeed = speed * -1;
                break;
            default:
                this.xSpeed = speed;
                break;
        }
        switch (ySpeedDirection) {
            case 0:
                this.ySpeed = speed;
                break;
            case 1:
                this.ySpeed = speed * -1;
                break;
            default: this.ySpeed = speed;
        }
    }
    move() {
        this.xPos += this.xSpeed;
        this.yPos += this.ySpeed;
    }
    getYPosition() {
        return this.yPos;
    }
    getXPosition() {
        return this.xPos;
    }
    getYSpeed() {
        return this.ySpeed;
    }
    getXSpeed() {
        return this.xSpeed;
    }
    getSize() {
        return this.size;
    }
}
export class Paddle {
    constructor(speed, xPos, yPos, size) {
        this.score = 0;
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.speed = speed;
    }
    moveUp() {
        this.yPos += this.speed;
    }
    moveDown() {
        this.yPos -= this.speed;
    }
    getPosition() {
        return this.yPos;
    }
    getSize() {
        return this.size;
    }
    setScore() {
        this.score++;
    }
    getScore() {
        return this.score;
    }
}
export class MultiPlayerGame {
    constructor(boardHeight, boardWidth, paddleMargin) {
        this.defaultBallSize = 20;
        this.defaultPaddleSize = 100;
        this.defaultBallSpeed = 1.2;
        this.defaultPaddleSpeed = 2;
        this.ballOutOfBounds = false;
        this.defaultRounds = 3;
        this.numberOfRound = 0;
        this.leftPaddleScore = 0;
        this.rightPaddleScore = 0;
        this.controls = {
            ArrowUp: false,
            ArrowDown: false,
            w: false,
            s: false,
        };
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.paddleMargin = paddleMargin;
        this.ball = new Ball(this.defaultBallSpeed, this.defaultBallSize, this.boardWidth / 2 - this.defaultBallSize / 2, this.boardHeight / 2 - this.defaultBallSize / 2);
        this.leftPaddle = new Paddle(this.defaultPaddleSpeed, this.paddleMargin, this.boardHeight / 2 - this.defaultPaddleSize / 2, this.defaultPaddleSize);
        this.rightPaddle = new Paddle(this.defaultPaddleSpeed, this.boardWidth - this.paddleMargin * 2, this.boardHeight / 2 - this.defaultPaddleSize / 2, this.defaultPaddleSize);
        this.isGameOver = false;
    }
    checkForWallColision() {
        if (this.ball.yPos + this.ball.size >= this.boardHeight || this.ball.yPos <= 0) {
            this.ball.changeYDirection();
        }
    }
    movePaddles() {
        if (this.controls.w && this.leftPaddle.yPos < this.boardHeight - this.leftPaddle.size) {
            this.leftPaddle.moveUp();
        }
        if (this.controls.s && this.leftPaddle.yPos > 0) {
            this.leftPaddle.moveDown();
        }
        if (this.controls.ArrowUp && this.rightPaddle.yPos < this.boardHeight - this.rightPaddle.size) {
            this.rightPaddle.moveUp();
        }
        if (this.controls.ArrowDown && this.rightPaddle.yPos > 0) {
            this.rightPaddle.moveDown();
        }
    }
    checkForPaddleColision() {
        if (this.ball.getXPosition() <= (this.paddleMargin + 5) && ((this.ball.getYPosition() > this.leftPaddle.getPosition()) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.leftPaddle.getPosition() + this.leftPaddle.getSize()))) {
            this.ball.changeXDirection();
            this.ball.lastTouchedPaddle = "left";
        }
        if ((this.ball.getXPosition() + this.ball.getSize()) >= this.boardWidth - this.paddleMargin - 5 && ((this.ball.getYPosition() > this.rightPaddle.getPosition()) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.rightPaddle.getPosition() + this.rightPaddle.getSize()))) {
            this.ball.changeXDirection();
            this.ball.lastTouchedPaddle = "right";
        }
    }
    EndRound() {
        if (this.ball.getXPosition() > this.boardWidth || this.ball.getXPosition() < 0) {
            this.ballOutOfBounds = true;
            console.log('round ended');
        }
    }
    updateScore() {
        if (this.ballOutOfBounds && this.ball.xPos > this.boardWidth) {
            this.leftPaddleScore++;
            console.log('left scored');
        }
        if (this.ballOutOfBounds && this.ball.xPos < 0) {
            this.rightPaddleScore++;
            console.log('right scored');
        }
    }
    startRound() {
        if (this.numberOfRound < this.defaultRounds && this.ballOutOfBounds) {
            this.ball = new Ball(this.defaultBallSpeed, this.defaultBallSize, this.boardWidth / 2 - this.defaultBallSize / 2, this.boardHeight / 2 - this.defaultBallSize / 2);
            this.leftPaddle = new Paddle(this.defaultPaddleSpeed, this.paddleMargin, this.boardHeight / 2 - this.defaultPaddleSize / 2, this.defaultPaddleSize);
            this.rightPaddle = new Paddle(this.defaultPaddleSpeed, this.boardWidth - this.paddleMargin * 2, this.boardHeight / 2 - this.defaultPaddleSize / 2, this.defaultPaddleSize);
            this.ballOutOfBounds = false;
            this.numberOfRound++;
            console.log('round started');
        }
    }
    startGame() {
        this.startRound();
        this.ball.move();
        this.movePaddles();
        this.checkForWallColision();
        this.checkForPaddleColision();
        this.EndRound();
        this.updateScore();
        this.endGame();
    }
    endGame() {
        if (this.leftPaddleScore > this.defaultRounds - this.leftPaddleScore || this.rightPaddleScore > this.defaultRounds - this.rightPaddleScore) {
            this.isGameOver = true;
            this.boardHeight = 3;
            this.boardWidth = 0;
            console.log(this.leftPaddleScore, this.rightPaddleScore);
            console.log('game ended');
        }
    }
    checkForGameOver() {
        return this.isGameOver;
    }
    returnWinner() {
        if (this.leftPaddleScore > this.rightPaddleScore) {
            return [`Left player wins ${this.leftPaddleScore} to ${this.rightPaddleScore}`, this.boardHeight, this.boardWidth];
        }
        if (this.rightPaddleScore > this.leftPaddleScore) {
            return [`Right player wins ${this.rightPaddleScore} to ${this.leftPaddleScore}`, this.boardHeight, this.boardWidth];
        }
    }
}
class QuickMatchBall extends Ball {
    constructor(speed, size, xPos, yPos) {
        super(speed, size, xPos, yPos);
    }
    changeXDirection() {
        this.xSpeed *= -1.2;
    }
}
export class QuickMatchGame extends MultiPlayerGame {
    constructor(boardHeight, boardWidth, paddleMargin) {
        super(boardHeight, boardWidth, paddleMargin);
        this.defaultRounds = 1;
        this.ball = new QuickMatchBall(this.defaultBallSpeed, this.defaultBallSize, this.boardWidth / 2 - this.defaultBallSize / 2, this.boardHeight / 2 - this.defaultBallSize / 2);
    }
}
export class SinglePlayerGame extends MultiPlayerGame {
    constructor(boardHeight, boardWidth, paddleMargin, difficulty) {
        super(boardHeight, boardWidth, paddleMargin);
        this.difficulty = difficulty;
        this.setDistanceToTrack();
    }
    movePaddles() {
        this.trackBall();
        if (this.controls.ArrowUp && this.rightPaddle.yPos < this.boardHeight - this.rightPaddle.size) {
            this.rightPaddle.moveUp();
        }
        if (this.controls.ArrowDown && this.rightPaddle.yPos > 0) {
            this.rightPaddle.moveDown();
        }
    }
    trackBall() {
        if (this.ball.xPos < this.distanceToTrack && (this.ball.getYPosition() < this.leftPaddle.getPosition())) {
            this.leftPaddle.moveDown();
        }
        if (this.ball.xPos < this.distanceToTrack && this.ball.getYPosition() > this.leftPaddle.getPosition() + this.leftPaddle.size) {
            this.leftPaddle.moveUp();
        }
    }
    setDistanceToTrack() {
        if (this.difficulty === 1) {
            this.distanceToTrack = this.boardWidth * 0.25;
            this.leftPaddle.speed *= 0.5;
        }
        if (this.difficulty === 2) {
            this.distanceToTrack = this.boardWidth * 0.4;
        }
        if (this.difficulty === 3) {
            this.distanceToTrack = this.boardWidth * 0.6;
            this.leftPaddle.speed *= 1.5;
        }
    }
}
class PowerUp {
    constructor(xPos, yPos, size, duration) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.duration = duration;
    }
    shorten(paddle) {
        if (this.duration > 0) {
            paddle.size /= 1.2;
            this.duration--;
        }
    }
    enlarge(paddle) {
        if (this.duration > 0) {
            paddle.size *= 1.2;
            this.duration--;
        }
    }
    slowDown(paddle) {
        if (this.duration > 0) {
            paddle.speed *= 0.7;
            this.duration--;
        }
    }
}
export class ArcadeGame extends MultiPlayerGame {
    constructor(boardHeight, boardWidth, paddleMargin) {
        super(boardHeight, boardWidth, paddleMargin);
        this.isPowerUpActive = false;
    }
    dropPowerUp() {
        if (!this.isPowerUpActive) { }
    }
    checkForPowerUpCollision() {
    }
}
