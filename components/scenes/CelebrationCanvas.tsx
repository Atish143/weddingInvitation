"use client";

import { useEffect, useRef } from "react";

type Particle =
  | {
      kind: "spark";
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }
  | {
      kind: "petal";
      x: number;
      y: number;
      vx: number;
      vy: number;
      rot: number;
      vr: number;
      life: number;
      color: string;
      size: number;
    }
  | {
      kind: "heart";
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
    };

const COLORS = ["#C9A227", "#F0D9A0", "#8B2635", "#FFF9EF", "#A9762F"];

type Props = { active: boolean };

export function CelebrationCanvas({ active }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const burst = (cx: number, cy: number) => {
      for (let i = 0; i < 36; i++) {
        const angle = (Math.PI * 2 * i) / 36;
        const speed = 2 + Math.random() * 4;
        particles.current.push({
          kind: "spark",
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: COLORS[i % COLORS.length],
          size: 2 + Math.random() * 2,
        });
      }
    };

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    burst(w() * 0.3, h() * 0.35);
    burst(w() * 0.7, h() * 0.3);
    burst(w() * 0.5, h() * 0.45);

    for (let i = 0; i < 40; i++) {
      particles.current.push({
        kind: "petal",
        x: Math.random() * w(),
        y: -20 - Math.random() * 80,
        vx: -0.5 + Math.random(),
        vy: 1 + Math.random() * 1.5,
        rot: Math.random() * Math.PI,
        vr: 0.02 + Math.random() * 0.04,
        life: 1,
        color: COLORS[i % COLORS.length],
        size: 6 + Math.random() * 5,
      });
    }
    for (let i = 0; i < 18; i++) {
      particles.current.push({
        kind: "heart",
        x: Math.random() * w(),
        y: h() + 10,
        vx: -0.3 + Math.random() * 0.6,
        vy: -(1 + Math.random() * 1.8),
        life: 1,
        size: 8 + Math.random() * 6,
      });
    }

    let frames = 0;
    const tick = () => {
      frames++;
      ctx.clearRect(0, 0, w(), h());
      if (frames % 40 === 0 && frames < 200) {
        burst(Math.random() * w(), Math.random() * h() * 0.5);
      }

      particles.current = particles.current.filter((p) => p.life > 0.02);
      for (const p of particles.current) {
        if (p.kind === "spark") {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.06;
          p.life *= 0.96;
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.kind === "petal") {
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;
          p.life *= 0.995;
          ctx.save();
          ctx.globalAlpha = Math.min(1, p.life);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.life *= 0.992;
          ctx.globalAlpha = Math.min(1, p.life);
          ctx.fillStyle = "#8B2635";
          ctx.font = `${p.size}px serif`;
          ctx.fillText("❤", p.x, p.y);
        }
      }
      ctx.globalAlpha = 1;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      particles.current = [];
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
      aria-hidden
    />
  );
}
