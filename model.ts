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
    
    
}
