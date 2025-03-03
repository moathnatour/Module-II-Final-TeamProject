class Ball {
    speed : number = 2;
    radius : string = "med";
    exist : boolean = true;

    color : string = "white";

    startX : number;
    startY : number;

    dX : number;
    dY: number;

    constructor (public x = 0,public y = 0){
        this.startX = x;
        this.startY = y;

        this.start();
    }

    isExist (){
        return this.exist;
    }

    draw ()
    {

    }
    getPositon(){

    }
    update(){
        let boardX = //canvas width
        let boardY = //canvas hight
        this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;

        if(this.x >= boardX || this.x <= 0){
            this.exist = false;
            this.dX = 0;
            this.dY = 0;
        }

        if(this.y >= boardY || this.y <= 0){
            this.dY = this.dY * -1;
        }
        
    }

    start() {
    }

    reset() {

    }

    hitPlayer() {

    }
}

class Player {
    length: number;
    width: number;
    speed: number;
    color: string;
    playerDirection: number;
    playerScore: number;
    playerName: string;
    startX: number;
    startY: number;

    constructor(public x = 0, public y = 0) {
        this.startX = x;
        this.startY = y;
    }

    update() {

    }

    draw() {

    }
    
    getScore() {

    }

    giveScore() {

    }
}

class ComputerPlayer extends Player {
    update() {
        
    }

}

class Game {
    canvasHight: number;
    canvasWidth: number;
    playerRight: Player;
    playerLeft: Player;
    ball: Ball;
    gameMode: string;

    constructor(canvasHight, canvasWidth, gameMode) {
        this.canvasHight = canvasHight;
        this.canvasWidth = canvasWidth;
        this.gameMode = gameMode;
    }

    draw() {

    }

    update() {

    }

    reset() {

    }
}