"use strict";
exports.__esModule = true;
exports.Ball = void 0;
var Ball = /** @class */ (function () {
    function Ball(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.radius = "med";
        this.exist = true;
        this.color = "white";
        this.startX = x;
        this.startY = y;
        this.start();
    }
    Ball.prototype.isExist = function () {
        return this.exist;
    };
    Ball.prototype.draw = function () {
    };
    Ball.prototype.getPositon = function () {
    };
    Ball.prototype.update = function () {
        var boardX = //canvas width
         let, boardY = //canvas hight
         this.x += this.dX * this.speed;
        this.y += this.dY * this.speed;
        if (this.x >= boardX || this.x <= 0) {
            this.exist = false;
            this.dX = 0;
            this.dY = 0;
        }
        if (this.y >= boardY || this.y <= 0) {
            this.dY = this.dY * -1;
        }
    };
    return Ball;
}());
exports.Ball = Ball;
var player = /** @class */ (function () {
    function player() {
    }
    return player;
}());
