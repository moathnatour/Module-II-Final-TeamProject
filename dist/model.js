var Ball = /** @class */ (function () {
    function Ball(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.speed = 2;
        this.radius = "med";
        this.exist = true;
        this.startX = x;
        this.startY = y;
        this.start();
    }
    return Ball;
}());
var player = /** @class */ (function () {
    function player() {
    }
    return player;
}());
