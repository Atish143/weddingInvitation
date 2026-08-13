"use client";

/** Lightweight Web Audio SFX — no external files required. */

let ctx: AudioContext | null = null;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

export function playScratchSound() {
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const t = ac.currentTime;
  const bufferSize = ac.sampleRate * 0.05;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize) * 0.15;
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 1800 + Math.random() * 800;
  filter.Q.value = 0.8;
  const gain = ac.createGain();
  gain.gain.value = 0.22;
  src.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);
  src.start(t);
}

export function playRevealSound() {
  const ac = getCtx();
  if (!ac) return;
  void ac.resume();
  const t = ac.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t + i * 0.08);
    gain.gain.linearRampToValueAtTime(0.18, t + i * 0.08 + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.9);
    osc.connect(gain);
    gain.connect(ac.destination);
    osc.start(t + i * 0.08);
    osc.stop(t + i * 0.08 + 1);
  });
}
