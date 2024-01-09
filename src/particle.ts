export class Particle {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected speed: number;
  protected velocity: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected position1: number;
  protected position2: number;
  protected mappedImage: any[][][];
  
  constructor(width: number, height: number,
    screenCanvas: CanvasRenderingContext2D,
    mapImg: number[][][]) {
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

  public update() {
    this.position1 = Math.floor(this.y);
    this.position2 = Math.floor(this.x);
    let movement = 0;
    if (this.y < this.height) {
      this.speed = this.mappedImage[0][this.position1][this.position2];
      movement = (2.5 - this.speed) + this.velocity;
    }

    this.y += movement;
    
    if (this.y >= this.height) {
      this.y = 0;
      this.x = Math.random() * this.width;
    }
  }

  public draw() {
    this.ctx.beginPath();
    //this.ctx.fillStyle = this.mappedImage[1][this.position1][this.position2];
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.fill();
  }

  public getSpeed(): number {
    return this.speed;
  }
}

export class ParticleText {
  protected x: number;
  protected y: number;
  protected size: number;
  protected ctx: CanvasRenderingContext2D;
  protected _2PI: number;
  protected baseX: number;
  protected baseY: number;
  protected density: number;
  protected mappedImage: any[][][];
  
  constructor(x: number, y: number, screenCanvas?: CanvasRenderingContext2D,
    mapImg?: number[][][]) {
    this.ctx = screenCanvas;
    this.x = x;// + 200;
    this.y = y;// - 100,
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = ((Math.random() * 30) + 1);
    this._2PI = Math.PI * 2;
    this.mappedImage = mapImg;
  }

  public update(mouse: any) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    var maxDistance = mouse.radius;
    var force = (maxDistance - distance) / maxDistance;

    let directionX = (forceDirectionX * force * this.density);
    let directionY = (forceDirectionY * force * this.density);
    
    if (distance < mouse.radius) {
      this.x -= directionX ;
      this.y -= directionY ;
    }
    else {
      if (this.x !== this.baseX ) {
          let dx = this.x - this.baseX;
          this.x -= dx/5;
      } if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy/5;
      }
    }
  }

  public draw() {
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, this._2PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

}


export class YellowFlower {
  public x: number;
  public y: number;
  public size: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
  }

  public draw() {
    this.ctx.fillStyle = 'yellow';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

export class Petal {
  public x: number;
  public y: number;
  public size: number;
  protected angle: number;
  protected ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, angle: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.angle = angle;
    this.ctx = ctx;
  }

  public draw() {
    this.ctx.fillStyle = 'yellow'; 
    this.ctx.beginPath();
    this.ctx.ellipse(this.x, this.y, this.size, this.size * 2, this.angle, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}

export class YellowFlowerWithPetals extends YellowFlower {
  public petals: Petal[];

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    super(x, y, size, ctx);
    this.petals = [];
    this.generatePetals();
  }

  protected generatePetals() {
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i; // Distribuye los pétalos uniformemente alrededor de la flor
      const petalSize = this.size * 1.5; // Ajusta el tamaño del pétalo según sea necesario
      this.petals.push(new Petal(this.x, this.y, petalSize, angle, this.ctx));
    }
  }

  public draw() {
    super.draw(); // Dibuja la flor amarilla base

    // Dibuja cada pétalo
    for (let i = 0; i < this.petals.length; i++) {
      this.petals[i].draw();
    }
  }

  
  
}

export class Leaf {
  protected x: number;
  protected y: number;
  protected width: number;
  protected height: number;
  protected ctx: CanvasRenderingContext2D;
  protected fallSpeed: number;

  constructor(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.fallSpeed = Math.random() * 2 + 1; 
  }

  public update() {
    this.y += this.fallSpeed;

    if (this.y > this.ctx.canvas.height) {
      this.y = 0;
      this.x = Math.random() * this.ctx.canvas.width; 
    }
  }

  public draw() {
    // Dibuja una hoja
    this.ctx.fillStyle = '#8B4513'; // Marrón para el tronco
    this.ctx.fillRect(this.x + this.width / 3, this.y + this.height * 0.7, this.width / 3, this.height * 0.3);
    this.ctx.fillStyle = '#228B22'; // Verde oscuro para la parte superior de la hoja
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + this.height / 2);
    this.ctx.quadraticCurveTo(this.x + this.width / 2, this.y, this.x + this.width, this.y + this.height / 2);
    this.ctx.quadraticCurveTo(this.x + this.width / 2, this.y + this.height, this.x, this.y + this.height / 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}