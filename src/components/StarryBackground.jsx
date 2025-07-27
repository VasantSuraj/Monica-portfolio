import React, { useEffect, useRef } from 'react';

export default function StarryBackground() {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function generateStars(width, height) {
      const totalStars = 150;
      const glowingStarsCount = 25;

      return Array.from({ length: totalStars }).map((_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.3 + 0.6,  // glow from 0.6 to 0.9
        glow: index < glowingStarsCount,
        alphaDirection: Math.random() < 0.5 ? 1 : -1,
        sparkle: false,
        sparkleTime: 0,
      }));
    }

    function resizeCanvas() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      starsRef.current = generateStars(width, height);
    }

    function spawnShootingStar(width, height) {
      if (shootingStarsRef.current.length < 2 && Math.random() < 0.01) {
        shootingStarsRef.current.push({
          x: Math.random() * width * 0.3,
          y: Math.random() * height * 0.3,
          length: 180 + Math.random() * 40,
          speed: 3.2,
          angle: Math.PI / 4,
          alpha: 1,
        });
      }
    }

    function draw() {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      starsRef.current.forEach(star => {
        if (star.glow) {
          star.baseAlpha += star.alphaDirection * 0.004;
          if (star.baseAlpha > 0.9 || star.baseAlpha < 0.6) {
            star.alphaDirection *= -1;
          }
        }

        if (star.sparkle) {
          star.sparkleTime += 1;
          if (star.sparkleTime > 10) {
            star.sparkle = false;
            star.sparkleTime = 0;
          }
        }

        const alpha = star.sparkle ? 1 : (star.glow ? star.baseAlpha : 0.6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      for (let i = shootingStarsRef.current.length - 1; i >= 0; i--) {
        const s = shootingStarsRef.current[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.002;

        if (s.alpha <= 0) {
          shootingStarsRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length,
          s.y - Math.sin(s.angle) * s.length
        );
        ctx.stroke();
      }

      spawnShootingStar(width, height);
      requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      starsRef.current.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < star.radius + 5) {
          star.sparkle = true;
          star.sparkleTime = 0;
        }
      });
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'auto',
        background: 'black',
      }}
    />
  );
}
