'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { playRevealSound, playScratchSound } from '@/lib/sounds';

type Props = {
  onReveal: () => void;
  revealed: boolean;
  overlayLabel?: string;
  children: React.ReactNode;
  className?: string;
  heightClass?: string;
};

export function ScratchCard({
  onReveal,
  revealed,
  overlayLabel = '✨ Scratch to Reveal',
  children,
  className = '',
  heightClass = 'h-40 sm:h-44',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const lastScratch = useRef(0);
  const [ready, setReady] = useState(false);
  const revealedRef = useRef(revealed);
  revealedRef.current = revealed;

  const paintCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { width, height } = canvas;

    const grad = ctx.createLinearGradient(0, 0, width, height);

    grad.addColorStop(0, '#D8BC82');
    grad.addColorStop(0.2, '#F2E2BE');
    grad.addColorStop(0.5, '#E7CE96');
    grad.addColorStop(0.8, '#F5E7C9');
    grad.addColorStop(1, '#CBA866');

    // ctx.globalCompositeOperation = 'source-over';
    // ctx.fillStyle = grad;
    // ctx.fillRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 140; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.12})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * width,
        Math.random() * height,
        0.5 + Math.random() * 1.8,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    ctx.strokeStyle = 'rgba(126,91,40,0.25)';
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = 'rgba(255,255,255,0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    ctx.fillStyle = '#5A4635';

    // ctx.fillStyle = '#4A3A35';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = overlayLabel.split('\n');
    ctx.font = `500 ${Math.min(15, Math.max(12, width / 22))}px Jost, sans-serif`;
    lines.forEach((line, i) => {
      ctx.fillText(
        line,
        width / 2,
        height / 2 + (i - (lines.length - 1) / 2) * 20,
      );
    });
    setReady(true);
  }, [overlayLabel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w;
      canvas.height = h;
      if (!revealedRef.current) paintCover();
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [paintCover]);

  useEffect(() => {
    if (revealed && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [revealed]);

  const sampleCleared = () => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    const step = 16;
    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] < 128) cleared++;
    }
    return cleared / Math.ceil(data.length / (4 * step));
  };

  const scratchAt = (clientX: number, clientY: number) => {
    if (revealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, Math.max(18, canvas.width * 0.045), 0, Math.PI * 2);
    ctx.fill();

    const now = performance.now();
    if (now - lastScratch.current > 90) {
      playScratchSound();
      lastScratch.current = now;
    }

    if (sampleCleared() >= 0.35) {
      playRevealSound();
      onReveal();
    }
  };

  return (
    <div
      className={`relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-gold/40 shadow-[0_16px_48px_rgba(196,163,90,0.28)] ${heightClass} ${className}`}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ivory via-blush/30 to-champagne/50 p-3 text-center sm:p-4">
        {children}
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 h-full w-full touch-none cursor-crosshair"
          style={{ opacity: ready ? 1 : 0 }}
          onPointerDown={e => {
            drawing.current = true;
            canvasRef.current?.setPointerCapture(e.pointerId);
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={e => {
            if (!drawing.current) return;
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            drawing.current = false;
          }}
          onPointerCancel={() => {
            drawing.current = false;
          }}
        />
      )}
    </div>
  );
}
