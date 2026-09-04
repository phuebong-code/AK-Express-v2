let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq: number, start: number, duration: number, gain: number = 0.15, type: OscillatorType = 'sine') {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration);
}

export function playLaunchChime() {
  try {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    playTone(523.25, 0, 0.3, 0.12, 'sine');
    playTone(659.25, 0.12, 0.3, 0.12, 'sine');
    playTone(783.99, 0.24, 0.4, 0.14, 'sine');
    playTone(1046.5, 0.36, 0.5, 0.10, 'sine');
  } catch {
    // Audio not available
  }
}

export function playOrderChime() {
  try {
    const ctx = getCtx();
    if (ctx && ctx.state === 'suspended') ctx.resume();
    playTone(659.25, 0, 0.2, 0.12, 'triangle');
    playTone(880.0, 0.1, 0.3, 0.12, 'triangle');
    playTone(1108.73, 0.2, 0.4, 0.10, 'triangle');
  } catch {
    // Audio not available
  }
}
