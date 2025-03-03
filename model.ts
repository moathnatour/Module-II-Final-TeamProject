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

    xPos = 50
    yPos = 50
    xSpeed: number
    ySpeed: number
    size: number
    speedMultiplier: number


    constructor(speed: number, speedMultiplier: number, size: number, xPos: number, yPos: number) {
        this.size = size;
        this.xPos = xPos;
        this.yPos = yPos;
        this.speedMultiplier = speedMultiplier;
        this.randomizeInitialDirection(speed)
    }

    changeXDirection() {
        this.xSpeed = this.xSpeed * -1;
    }

    changeYDirection() {
        this.ySpeed = this.ySpeed * -1;
    }

    randomizeInitialDirection(speed: number) {

        const xSpeedDirection = Math.floor(Math.random() * 2);
        const ySpeedDirection = Math.floor(Math.random() * 2);

        switch (xSpeedDirection) {
            case 0: this.xSpeed = speed
                break;

            case 1: this.xSpeed = speed * -1;
                break;

            default: this.xSpeed = speed;
                break;
        }

        switch (ySpeedDirection) {
            case 0: this.ySpeed = speed;
                break;

            case 1: this.ySpeed = speed * -1;
                break;

            default: this.ySpeed = speed;
        }
    }

    move() {
        this.xPos += this.speedMultiplier * this.xSpeed;
        this.yPos += this.speedMultiplier * this.ySpeed;
    }

}


export class Paddle {

    xPos: number
    yPos: number
    speed: number
    size: number
    counter = 0;

    constructor(speed : number, xPos: number, yPos: number, size: number) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.speed = speed
    }


    moveUp() {
        this.yPos -= this.speed;
       
    }

    moveDown(){
        this.yPos += this.speed;
    }

    registerTouch() {
        this.counter++
    }

    resetCounter() {
        this.counter = 0;
    }

}