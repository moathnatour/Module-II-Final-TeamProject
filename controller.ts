import { Ball, } from "./model.js"

export function bounceBallAround (speed : number, speedMultiplier : number , size : number, xPos : number, yPos : number){

    const newBall = new Ball(speed, speedMultiplier, size, xPos, yPos);

    function moveBall(){
        newBall.move()
    }
   
    function getYPosition(){
        return newBall.yPos
    }

    function getXPosition(){
        return newBall.xPos
    }

    function changeXDirection(){
        newBall.changeXDirection();
    }

    function changeYDirection(){
        newBall.changeYDirection();
    }

    function getySpeeds(){
        return  newBall.ySpeed;
    }

return { moveBall, getYPosition, getXPosition, changeXDirection, changeYDirection, getySpeeds};
   
}
