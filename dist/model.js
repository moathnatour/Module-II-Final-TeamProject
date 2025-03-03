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
        this.outOfBounds = false;
        this.size = size;
        this.xPos = xPos;
        this.yPos = yPos;
        this.randomizeInitialDirection(speed);
        this.id = crypto.randomUUID().replaceAll("-", " ").slice(-6);
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
        this.counter = 0;
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
    registerTouch() {
        this.counter++;
    }
    resetCounter() {
        this.counter = 0;
    }
    getPosition() {
        return this.yPos;
    }
    getSize() {
        return this.size;
    }
}
export class MultiPlayerGame {
    constructor(boardHeight, boardWidth, paddleMargin) {
        this.controls = {
            ArrowUp: false,
            ArrowDown: false,
            w: false,
            s: false,
        };
        const defaultBallSize = 20;
        const defaultPaddleSize = 100;
        const defaultBallSpeed = 1;
        const defaultPaddleSpeed = 2;
        this.boardHeight = boardHeight;
        this.boardWidth = boardWidth;
        this.paddleMargin = paddleMargin;
        this.balls = [
            new Ball(defaultBallSpeed, defaultBallSize, boardWidth / 2 - defaultBallSize / 2, boardHeight / 2 - defaultBallSize / 2)
        ];
        this.leftPaddle = new Paddle(defaultPaddleSpeed, paddleMargin, boardHeight / 2 - defaultPaddleSize / 2, defaultPaddleSize);
        this.rightPaddle = new Paddle(defaultPaddleSpeed, boardWidth - paddleMargin * 2, boardHeight / 2 - defaultPaddleSize / 2, defaultPaddleSize);
    }
    addBall() {
        this.balls.push(new Ball(1, 20, this.boardWidth / 2, this.boardHeight / 2));
    }
    checkForWallColision() {
        for (const ball of this.balls) {
            if (ball.yPos + ball.size >= this.boardHeight || ball.yPos <= 0) {
                ball.changeYDirection();
            }
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
        for (const ball of this.balls) {
            if (ball.getXPosition() === (this.paddleMargin + 5) && ((ball.getYPosition() >= this.leftPaddle.getPosition()) && (ball.getYPosition() + ball.getSize() / 2 <= this.leftPaddle.getPosition() + this.leftPaddle.getSize()))) {
                ball.changeXDirection();
            }
            if ((ball.getXPosition() + ball.getSize()) === this.boardWidth - this.paddleMargin - 5 && ((ball.getYPosition() >= this.rightPaddle.getPosition()) && (ball.getYPosition() + ball.getSize() / 2 < this.rightPaddle.getPosition() + this.rightPaddle.getSize()))) {
                ball.changeXDirection();
            }
            if (ball.getXPosition() === (this.paddleMargin + 5) && (ball.getYPosition() + ball.getSize() / 2 < this.leftPaddle.getPosition() - this.leftPaddle.getSize() / 2) && (ball.getYPosition() + ball.getSize() / 2 > this.leftPaddle.getPosition() - this.leftPaddle.getSize() / 2)) {
                ball.changeXDirection();
                ball.changeYDirection();
            }
            if (ball.getXPosition() - ball.getSize() / 2 === this.leftPaddle.xPos && (ball.getYPosition() > this.leftPaddle.getPosition() + this.leftPaddle.getSize() / 2) && (ball.getYPosition() + ball.getSize() / 2 < this.leftPaddle.getPosition() + this.leftPaddle.getSize() / 2)) {
                ball.changeXDirection();
                ball.changeYDirection();
            }
            if ((ball.getXPosition() + ball.getSize() / 2) === (this.rightPaddle.xPos) && (ball.getYPosition() < this.rightPaddle.getPosition() - this.rightPaddle.getSize() / 2) && (ball.getYPosition() + ball.getSize() / 2 > this.rightPaddle.getPosition() - this.rightPaddle.getSize() / 2)) {
                ball.changeXDirection();
                ball.changeYDirection();
            }
            if ((ball.getXPosition() + ball.getSize() / 2) === (this.rightPaddle.xPos) && (ball.getYPosition() > this.rightPaddle.getPosition() + this.rightPaddle.getSize() / 2) && (ball.getYPosition() - ball.getSize() / 2 < this.rightPaddle.getPosition() + this.rightPaddle.getSize() / 2)) {
                ball.changeXDirection();
                ball.changeYDirection();
            }
        }
    }
}
