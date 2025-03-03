var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
    Ball.prototype.start = function () {
    };
    Ball.prototype.reset = function () {
    };
    Ball.prototype.hitPlayer = function () {
    };
    return Ball;
}());
var Player = /** @class */ (function () {
    function Player(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
        this.startX = x;
        this.startY = y;
    }
    Player.prototype.update = function () {
    };
    Player.prototype.draw = function () {
    };
    Player.prototype.getScore = function () {
    };
    Player.prototype.giveScore = function () {
    };
    return Player;
}());
var ComputerPlayer = /** @class */ (function (_super) {
    __extends(ComputerPlayer, _super);
    function ComputerPlayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ComputerPlayer.prototype.update = function () {
    };
    return ComputerPlayer;
}(Player));
var Game = /** @class */ (function () {
    function Game(canvasHight, canvasWidth, gameMode) {
        this.canvasHight = canvasHight;
        this.canvasWidth = canvasWidth;
        this.gameMode = gameMode;
    }
    Game.prototype.draw = function () {
    };
    Game.prototype.update = function () {
    };
    Game.prototype.reset = function () {
    };
    return Game;
}());
