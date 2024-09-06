class Particle {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  color: string;

  constructor(
    x: number,
    y: number,
    size: number,
    velocityX: number,
    velocityY: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.color = color;
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    if (this.x > window.innerWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = window.innerWidth;
    }
    if (this.y > window.innerHeight) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = window.innerHeight;
    }
    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
export { Particle };
