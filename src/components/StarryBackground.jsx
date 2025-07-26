import React, { useEffect } from 'react';

export default function StarryBackground() {
  useEffect(() => {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const width = canvas.width;
    const height = canvas.height;

    // ⭐ Static stars
    const totalStars = 150;
    const glowingStarsCount = 25;

    const stars = Array.from({ length: totalStars }).map((_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.8,
      baseAlpha: Math.random() * 0.5 + 0.5,
      glow: index < glowingStarsCount,
      alphaDirection: Math.random() < 0.5 ? 1 : -1,
      sparkle: false,
      sparkleTime: 0
    }));

    const shootingStars = [];

    function spawnShootingStar() {
      if (shootingStars.length < 3 && Math.random() < 0.01) {
        shootingStars.push({
          x: Math.random() * width * 0.3,
          y: Math.random() * height * 0.3,
          length: 250 + Math.random() * 50, // 🎯 Smaller trail
          speed: 6,                         // 🎯 Slower speed
          angle: Math.PI / 4,
          alpha: 1,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // ⭐ Draw static stars
      stars.forEach(star => {
        if (star.glow) {
          star.baseAlpha += star.alphaDirection * 0.01;
          if (star.baseAlpha > 1 || star.baseAlpha < 0.5) {
            star.alphaDirection *= -1;
          }
        }

        // Sparkle effect on click
        if (star.sparkle) {
          star.sparkleTime += 1;
          if (star.sparkleTime > 10) {
            star.sparkle = false;
            star.sparkleTime = 0;
          }
        }

        const alpha = star.sparkle
          ? 1
          : (star.glow ? star.baseAlpha : 0.6);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });

      // ☄️ Draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.003;

        if (s.alpha <= 0) {
          shootingStars.splice(i, 1);
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

      spawnShootingStar();
      requestAnimationFrame(draw);
    }

    // ✨ Click interaction
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      stars.forEach(star => {
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < star.radius + 5) {
          star.sparkle = true;
          star.sparkleTime = 0;
          console.log("✨ Sparkle at:", Math.round(star.x), Math.round(star.y));
        }
      });
    });

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
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
