import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  width?: number;
  height?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  velocityX: number;
  velocityY: number;
  color: string;
  update(): void;
  draw(ctx: CanvasRenderingContext2D  ): void;
}


  class MyParticle implements Particle {
    x: number;
    y: number;
    size: number;
    velocityX: number;
    velocityY: number;
    color: string;

    constructor(x: number, y: number, size: number, velocityX: number, velocityY: number, color: string) {
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

      // Wrap particles around the canvas edges
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
    };


    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    };
  }


  
    const ParticleSystem: React.FC<CanvasProps> = ({ width = window.innerWidth, height = window.innerHeight }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [canvasDimensions, setCanvasDimensions] = useState({ width, height });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      const initParticles = () => {
        const particlesArray: Particle[] = [];

        const numberOfParticles = (canvas.height * canvas.width) / 9000;

        for (let i = 0; i < numberOfParticles* 2; i++) {
          const size = (Math.random() * 3) + 1;
          const x = Math.random() * ((innerWidth - size * 2) - (size * 2)) + (size * 2);
          const y = Math.random() * ((innerHeight - size * 2) - (size * 2)) + (size * 2);
          const directionX = Math.random() * 1 - 0.5;
          const directionY = Math.random() * 1 - 0.5;
          const color = 'rgba(255, 255, 255, 0.5)';

          particlesArray.push(new MyParticle(x, y, size,directionX, directionY,  color));
        }

        setParticles(particlesArray);
      };

      const animate = () => {
        requestAnimationFrame(animate);
        ctx?.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          if (ctx) {
            particles[i].draw(ctx);
          }
        }

     
      let opacityValue = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const particle1 = particles[i];
          const particle2 = particles[j];
          const distance = 
            Math.pow(particle2.x - particle1.x, 2) +
            Math.pow(particle2.y - particle1.y, 2);
          if ((distance <  4000) && ctx) { 
            const opacityValue = 1 - (distance / 20000);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue})`;
            ctx.stroke();
          }
        }
      }}
    


      initParticles();
      animate();

      window.addEventListener('resize', () => {
        setCanvasDimensions({ width: window.innerWidth, height: window.innerHeight });
      });
    }
  }, []);

  return (
    <canvas id="canvas1" width={canvasDimensions.width} height={canvasDimensions.height} ref={canvasRef} />
  );
};

export default ParticleSystem;