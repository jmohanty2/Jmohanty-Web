// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

function rotate(velocity, angle) {
  return {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
  };
}

class Ball 
{
  constructor(x, y, velX, velY, color, size) 
  {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() 
  {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() 
  {
    if (this.x + this.size >= width) 
    {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) 
    {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) 
    {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) 
    {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this === ball) continue;
  
      const dx = this.x - ball.x;
      const dy = this.y - ball.y;
      const dist = Math.hypot(dx, dy);
      const minDist = this.size + ball.size;
  
      if (dist >= minDist) continue;
  
      const angle = Math.atan2(dy, dx);
      const totalMass = this.size + ball.size;
  
      const v1 = rotate({ x: this.velX, y: this.velY }, angle);
      const v2 = rotate({ x: ball.velX, y: ball.velY }, angle);
  
      const u1x = ((this.size - ball.size) * v1.x + 2 * ball.size * v2.x) / totalMass;
      const u2x = ((ball.size - this.size) * v2.x + 2 * this.size * v1.x) / totalMass;
  
      const final1 = rotate({ x: u1x, y: v1.y }, -angle);
      const final2 = rotate({ x: u2x, y: v2.y }, -angle);
  
      [this.velX, this.velY] = [final1.x, final1.y];
      [ball.velX, ball.velY] = [final2.x, final2.y];
  
      const overlap = 0.5 * (minDist - dist + 1);
      const offsetX = Math.cos(angle) * overlap;
      const offsetY = Math.sin(angle) * overlap;
  
      this.x += offsetX;
      this.y += offsetY;
      ball.x -= offsetX;
      ball.y -= offsetY;
    }
  }
  
}

const balls = [];

while (balls.length < 25) 
  {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}

function loop() 
{
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) 
  {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();