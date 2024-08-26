import React, { useRef, useEffect, useState } from "react";

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
}
const PlexusEffect: React.FC<CanvasProps> = ({
  width = window.innerWidth,
  height = window.innerHeight,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const initParticles = () => {
        const numberOfParticles = 100;
        const particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 5 + 1,
            velocityX: Math.random() * 1 - 0.5,
            velocityY: Math.random() * 1 - 0.5,
            color: "rgba(255, 255, 255, 0.5)",
          });
        }
        setParticles(particlesArray);
      };

      const draw = () => {
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          particles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });

          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const particle1 = particles[i];
              const particle2 = particles[j];
              const distance = Math.sqrt(
                Math.pow(particle2.x - particle1.x, 2) +
                  Math.pow(particle2.y - particle1.y, 2)
              );
              if (distance < 50) {
                ctx.beginPath();
                ctx.moveTo(particle1.x, particle1.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.stroke();
              }
            }
          }
        }
      };

      const updateParticles = () => {
        particles.forEach((particle) => {
          particle.x += particle.velocityX;
          particle.y += particle.velocityY;

          if (particle.x > width) {
            particle.x = 0;
          } else if (particle.x < 0) {
            particle.x = width;
          }
          if (particle.y > height) {
            particle.y = 0;
          } else if (particle.y < 0) {
            particle.y = height;
          }
        });
      };

      const animate = () => {
        updateParticles();
        draw();
        requestAnimationFrame(animate);
      };

      initParticles();
      animate();
    }
  }, []);
  return (
    <canvas
      className="PlexusEffectSplitScreen"
      width={width}
      height={height}
      ref={canvasRef}
    />
  );
};

export default PlexusEffect;
