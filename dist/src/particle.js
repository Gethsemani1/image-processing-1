var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Particle = /** @class */ (function () {
    function Particle(width, height, screenCanvas, mapImg) {
        this.width = width;
        this.height = height;
        this.ctx = screenCanvas;
        this.x = Math.random() * width;
        this.y = 0;
        this.speed = 0;
        this.velocity = Math.random() * 2.5;
        this.size = Math.random() * 1.5 + 1;
        this._2PI = Math.PI * 2;
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        this.mappedImage = mapImg;
    }
    Particle.prototype.update = function () {
        this.position1 = Math.floor(this.y);
        this.position2 = Math.floor(this.x);
        var movement = 0;
        if (this.y < this.height) {
            this.speed = this.mappedImage[0][this.position1][this.position2];
            movement = (2.5 - this.speed) + this.velocity;
        }
        this.y += movement;
        if (this.y >= this.height) {
            this.y = 0;
            this.x = Math.random() * this.width;
        }
    };
    Particle.prototype.draw = function () {
        this.ctx.beginPath();
        //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
        this.ctx.fillStyle = 'white';
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.fill();
    };
    Particle.prototype.getSpeed = function () {
        return this.speed;
    };
    return Particle;
}());
export { Particle };
var ParticleText = /** @class */ (function () {
    function ParticleText(x, y, screenCanvas, mapImg) {
        this.ctx = screenCanvas;
        this.x = x; // + 200;
        this.y = y; // - 100,
        this.size = 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = ((Math.random() * 30) + 1);
        this._2PI = Math.PI * 2;
        this.mappedImage = mapImg;
    }
    ParticleText.prototype.update = function (mouse) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        var forceDirectionX = dx / distance;
        var forceDirectionY = dy / distance;
        var maxDistance = mouse.radius;
        var force = (maxDistance - distance) / maxDistance;
        var directionX = (forceDirectionX * force * this.density);
        var directionY = (forceDirectionY * force * this.density);
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        }
        else {
            if (this.x !== this.baseX) {
                var dx_1 = this.x - this.baseX;
                this.x -= dx_1 / 5;
            }
            if (this.y !== this.baseY) {
                var dy_1 = this.y - this.baseY;
                this.y -= dy_1 / 5;
            }
        }
    };
    ParticleText.prototype.draw = function () {
        this.ctx.fillStyle = 'blue';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return ParticleText;
}());
export { ParticleText };
var YellowFlower = /** @class */ (function () {
    function YellowFlower(x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.ctx = ctx;
    }
    YellowFlower.prototype.draw = function () {
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return YellowFlower;
}());
export { YellowFlower };
var Petal = /** @class */ (function () {
    function Petal(x, y, size, angle, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.ctx = ctx;
    }
    Petal.prototype.draw = function () {
        this.ctx.fillStyle = 'yellow';
        this.ctx.beginPath();
        this.ctx.ellipse(this.x, this.y, this.size, this.size * 2, this.angle, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.fill();
    };
    return Petal;
}());
export { Petal };
var YellowFlowerWithPetals = /** @class */ (function (_super) {
    __extends(YellowFlowerWithPetals, _super);
    function YellowFlowerWithPetals(x, y, size, ctx) {
        var _this = _super.call(this, x, y, size, ctx) || this;
        _this.petals = [];
        _this.generatePetals();
        return _this;
    }
    YellowFlowerWithPetals.prototype.generatePetals = function () {
        for (var i = 0; i < 6; i++) {
            var angle = (Math.PI / 3) * i; // Distribuye los pétalos uniformemente alrededor de la flor
            var petalSize = this.size * 1.5; // Ajusta el tamaño del pétalo según sea necesario
            this.petals.push(new Petal(this.x, this.y, petalSize, angle, this.ctx));
        }
    };
    YellowFlowerWithPetals.prototype.draw = function () {
        _super.prototype.draw.call(this); // Dibuja la flor amarilla base
        // Dibuja cada pétalo
        for (var i = 0; i < this.petals.length; i++) {
            this.petals[i].draw();
        }
    };
    return YellowFlowerWithPetals;
}(YellowFlower));
export { YellowFlowerWithPetals };
var RainOfFlowers = /** @class */ (function () {
    function RainOfFlowers(ctx) {
        this.flowers = [];
        this.ctx = ctx;
        this.generateFlowers();
    }
    RainOfFlowers.prototype.generateFlowers = function () {
        for (var i = 0; i < 100; i++) {
            var x = Math.random() * this.ctx.canvas.width;
            var y = Math.random() * this.ctx.canvas.height;
            var size = Math.random() * 10 + 5;
            this.flowers.push(new YellowFlowerWithPetals(x, y, size, this.ctx));
        }
    };
    RainOfFlowers.prototype.update = function () {
        for (var i = 0; i < this.flowers.length; i++) {
            this.flowers[i].y += 2; // Ajusta la velocidad de caída según sea necesario
            // Reinicia la posición si una flor llega al fondo del lienzo
            if (this.flowers[i].y > this.ctx.canvas.height) {
                this.flowers[i].y = 0;
            }
        }
    };
    RainOfFlowers.prototype.draw = function () {
        for (var i = 0; i < this.flowers.length; i++) {
            this.flowers[i].draw();
        }
    };
    return RainOfFlowers;
}());
export { RainOfFlowers };
