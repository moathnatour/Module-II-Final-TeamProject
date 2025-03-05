// class Ball {
//     speed : number = 2;
//     radius : string = "med";
//     exist : boolean = true;
//     color : string = "white";
//     startX : number;
//     startY : number;
//     dX : number;
//     dY: number;
//     constructor (public x = 0,public y = 0){
//         this.startX = x;
//         this.startY = y;
//         this.start();
//     }
//     isExist (){
//         return this.exist;
//     }
//     draw ()
//     {
//     }
//     getPositon(){
//     }
//     update(){
//         let boardX = //canvas width
//         let boardY = //canvas hight
//         this.x += this.dX * this.speed;
//         this.y += this.dY * this.speed;
//         if(this.x >= boardX || this.x <= 0){
//             this.exist = false;
//             this.dX = 0;
//             this.dY = 0;
//         }
//         if(this.y >= boardY || this.y <= 0){
//             this.dY = this.dY * -1;
//         }
//     }
//     start() {
//     }
//     reset() {
//     }
//     hitPlayer() {
//     }
// }
// class Player {
//     length: number;
//     width: number;
//     speed: number;
//     color: string;
//     playerDirection: number;
//     playerScore: number;
//     playerName: string;
//     startX: number;
//     startY: number;
//     constructor(public x = 0, public y = 0) {
//         this.startX = x;
//         this.startY = y;
//     }
//     update() {
//     }
//     draw() {
//     }
//     getScore() {
//     }
//     giveScore() {
//     }
// }
// class ComputerPlayer extends Player {
//     update() {
//     }
// }
// class Game {
//     canvasHight: number;
//     canvasWidth: number;
//     playerRight: Player;
//     playerLeft: Player;
//     ball: Ball;
//     gameMode: string;
//     constructor(canvasHight, canvasWidth, gameMode) {
//         this.canvasHight = canvasHight;
//         this.canvasWidth = canvasWidth;
//         this.gameMode = gameMode;
//     }
//     draw() {
//     }
//     update() {
//     }
//     reset() {
//     }
// }
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
        this.defaultBallSpeed = 1;
        this.defaultPaddleSpeed = 2;
        this.ballOutOfBounds = false;
        this.defaultRounds = 9;
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
        this.ball =
            new Ball(this.defaultBallSpeed, this.defaultBallSize, this.boardWidth / 2 - this.defaultBallSize / 2, this.boardHeight / 2 - this.defaultBallSize / 2);
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
        if (this.ball.getXPosition() === (this.paddleMargin + 5) && ((this.ball.getYPosition() > this.leftPaddle.getPosition()) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.leftPaddle.getPosition() + this.leftPaddle.getSize()))) {
            this.ball.changeXDirection();
            this.ball.lastTouchedPaddle = "left";
        }
        if ((this.ball.getXPosition() + this.ball.getSize()) === this.boardWidth - this.paddleMargin - 5 && ((this.ball.getYPosition() > this.rightPaddle.getPosition()) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.rightPaddle.getPosition() + this.rightPaddle.getSize()))) {
            this.ball.changeXDirection();
            this.ball.lastTouchedPaddle = "right";
        }
        // if (this.ball.getXPosition() === (this.paddleMargin + 5) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.leftPaddle.getPosition() - this.leftPaddle.getSize() / 2) && (this.ball.getYPosition() + this.ball.getSize() / 2 > this.leftPaddle.getPosition() - this.leftPaddle.getSize() / 2)) {
        //     this.ball.changeXDirection();
        //     this.ball.changeYDirection();
        // }
        // if (this.ball.getXPosition() - this.ball.getSize() / 2 === this.leftPaddle.xPos && (this.ball.getYPosition() > this.leftPaddle.getPosition() + this.leftPaddle.getSize() / 2) && (this.ball.getYPosition() + this.ball.getSize() / 2 < this.leftPaddle.getPosition() + this.leftPaddle.getSize() / 2)) {
        //     this.ball.changeXDirection();
        //     this.ball.changeYDirection();
        // }
        // if ((this.ball.getXPosition() + this.ball.getSize() / 2) === (this.rightPaddle.xPos) && (this.ball.getYPosition() < this.rightPaddle.getPosition() - this.rightPaddle.getSize() / 2) && (this.ball.getYPosition() + this.ball.getSize() / 2 > this.rightPaddle.getPosition() - this.rightPaddle.getSize() / 2)) {
        //     this.ball.changeXDirection();
        //     this.ball.changeYDirection();
        // }
        // if ((this.ball.getXPosition() + this.ball.getSize() / 2) === (this.rightPaddle.xPos) && (this.ball.getYPosition() > this.rightPaddle.getPosition() + this.rightPaddle.getSize() / 2) && (this.ball.getYPosition() - this.ball.getSize() / 2 < this.rightPaddle.getPosition() + this.rightPaddle.getSize() / 2)) {
        //     this.ball.changeXDirection();
        //     this.ball.changeYDirection();
        // }
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
        // setTimeout(() => this.startRound(), 1000);
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
            console.log(this.leftPaddleScore, this.rightPaddleScore);
            console.log('game ended');
        }
    }
    checkForGameOver() {
        return this.isGameOver;
    }
    returnWinner() {
        if (this.leftPaddleScore > this.rightPaddleScore) {
            return `Left player wins ${this.leftPaddleScore} to ${this.rightPaddleScore}`;
        }
        if (this.rightPaddleScore > this.leftPaddleScore) {
            return `Right player wins ${this.rightPaddleScore} to ${this.leftPaddleScore}`;
        }
    }
}
