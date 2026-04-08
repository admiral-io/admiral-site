'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  type: 'node' | 'cluster' | 'small';
  // Orbital drift gives particles a slow curving motion
  orbitAngle: number;
  orbitSpeed: number;
  orbitRadius: number;
}

// Data pulses that travel along connections
interface Pulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: 'amber' | 'blue';
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const timeRef = useRef(0);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.floor((width * height) / 9000);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const rand = Math.random();
      let type: Particle['type'] = 'small';
      let radius = 1 + Math.random() * 1.5;

      if (rand < 0.08) {
        type = 'cluster';
        radius = 3 + Math.random() * 2.5;
      } else if (rand < 0.28) {
        type = 'node';
        radius = 1.8 + Math.random() * 1.2;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius,
        opacity: 0.2 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.025,
        type,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.008,
        orbitRadius: 0.15 + Math.random() * 0.35,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };
      particlesRef.current = initParticles(rect.width, rect.height);
      pulsesRef.current = [];
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const connectionDistance = 160;
    const mouseRadius = 220;

    const draw = () => {
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      const pulses = pulsesRef.current;
      const mouse = mouseRef.current;
      timeRef.current++;

      ctx.clearRect(0, 0, width, height);

      // Update particles
      for (const p of particles) {
        // Orbital drift
        p.orbitAngle += p.orbitSpeed;
        const driftX = Math.cos(p.orbitAngle) * p.orbitRadius;
        const driftY = Math.sin(p.orbitAngle) * p.orbitRadius;

        p.x += p.vx + driftX;
        p.y += p.vy + driftY;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse interaction
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouseRadius && mDist > 0) {
          const force = (1 - mDist / mouseRadius) * 0.04;
          p.vx += (mdx / mDist) * force;
          p.vy += (mdy / mDist) * force;
        }

        // Dampen velocity
        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      // Spawn data pulses occasionally
      if (timeRef.current % 12 === 0 && pulses.length < 25) {
        // Find a random cluster particle to originate from
        const clusters = particles
          .map((p, i) => ({ p, i }))
          .filter(({ p }) => p.type === 'cluster');

        if (clusters.length > 0) {
          const from = clusters[Math.floor(Math.random() * clusters.length)];
          // Find a nearby particle to send a pulse to
          for (let j = 0; j < particles.length; j++) {
            if (j === from.i) continue;
            const dx = particles[j].x - from.p.x;
            const dy = particles[j].y - from.p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
              pulses.push({
                fromIndex: from.i,
                toIndex: j,
                progress: 0,
                speed: 0.015 + Math.random() * 0.025,
                color: Math.random() > 0.4 ? 'amber' : 'blue',
              });
              break;
            }
          }
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;

            if (a.type === 'cluster' || b.type === 'cluster') {
              ctx.strokeStyle = `rgba(245, 158, 11, ${alpha * 1.4})`;
              ctx.lineWidth = 0.9;
            } else {
              ctx.strokeStyle = `rgba(91, 141, 239, ${alpha})`;
              ctx.lineWidth = 0.4;
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw and update data pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const from = particles[pulse.fromIndex];
        const to = particles[pulse.toIndex];
        if (!from || !to) {
          pulses.splice(i, 1);
          continue;
        }

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;
        const pulseRadius = 2.5;

        const rgb = pulse.color === 'amber' ? '245, 158, 11' : '91, 141, 239';
        const glow = ctx.createRadialGradient(px, py, 0, px, py, pulseRadius * 5);
        glow.addColorStop(0, `rgba(${rgb}, 0.4)`);
        glow.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px, py, pulseRadius * 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${rgb}, 0.9)`;
        ctx.beginPath();
        ctx.arc(px, py, pulseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw particles
      for (const p of particles) {
        const pulseAlpha = p.opacity + Math.sin(p.pulse) * 0.2;

        if (p.type === 'cluster') {
          // Outer glow
          const gradient = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, p.radius * 5
          );
          gradient.addColorStop(0, `rgba(245, 158, 11, ${pulseAlpha * 0.35})`);
          gradient.addColorStop(0.5, `rgba(245, 158, 11, ${pulseAlpha * 0.1})`);
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 5, 0, Math.PI * 2);
          ctx.fill();

          // Core
          ctx.fillStyle = `rgba(245, 158, 11, ${pulseAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'node') {
          ctx.fillStyle = `rgba(91, 141, 239, ${pulseAlpha * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(143, 163, 199, ${pulseAlpha * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, mouseRadius
        );
        gradient.addColorStop(0, 'rgba(91, 141, 239, 0.06)');
        gradient.addColorStop(1, 'rgba(91, 141, 239, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
