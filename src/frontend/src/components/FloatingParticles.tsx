import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  color: string;
  phase: number;
}

const PARTICLE_COLORS = [
  "255, 182, 220", // soft pink
  "200, 162, 255", // soft violet
  "255, 220, 240", // blush
  "180, 140, 255", // lavender
  "255, 255, 255", // white
  "240, 180, 255", // light purple
];

function createParticle(canvasWidth: number, canvasHeight: number): Particle {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 2.5 + 1,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(Math.random() * 0.5 + 0.2),
    opacity: Math.random() * 0.35 + 0.15,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    phase: Math.random() * Math.PI * 2,
  };
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  p: Particle,
  breathe: number,
) {
  const gradient = ctx.createRadialGradient(
    p.x,
    p.y,
    0,
    p.x,
    p.y,
    p.radius * 3,
  );
  gradient.addColorStop(0, `rgba(${p.color}, ${Math.min(breathe, 0.7)})`);
  gradient.addColorStop(1, `rgba(${p.color}, 0)`);

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${p.color}, ${Math.min(breathe + 0.1, 0.75)})`;
  ctx.fill();
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = 70;
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(canvas.width, canvas.height),
    );

    if (prefersReducedMotion) {
      for (const p of particlesRef.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }
      return () => {
        window.removeEventListener("resize", resize);
      };
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      timeRef.current += 0.008;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        const sway = Math.sin(timeRef.current + p.phase) * 0.3;
        p.x += p.vx + sway;
        p.y += p.vy;

        const breathe =
          p.opacity + Math.sin(timeRef.current * 1.5 + p.phase) * 0.08;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        drawParticle(ctx, p, breathe);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-label="Decorative floating particles background"
    />
  );
}
