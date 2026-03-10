import { useCallback, useEffect, useRef, useState } from "react";

// Three distinct flute melody patterns
const MELODIES = [
  {
    name: "রাগ ভৈরবী",
    notes: [
      { freq: 493.88, dur: 0.7 },
      { freq: 440.0, dur: 0.5 },
      { freq: 392.0, dur: 0.6 },
      { freq: 349.23, dur: 0.8 },
      { freq: 392.0, dur: 0.5 },
      { freq: 440.0, dur: 0.6 },
      { freq: 493.88, dur: 0.5 },
      { freq: 523.25, dur: 0.9 },
      { freq: 493.88, dur: 0.5 },
      { freq: 440.0, dur: 0.6 },
      { freq: 392.0, dur: 0.7 },
      { freq: 349.23, dur: 1.1 },
      { freq: 329.63, dur: 0.6 },
      { freq: 349.23, dur: 0.5 },
      { freq: 392.0, dur: 0.7 },
      { freq: 440.0, dur: 1.2 },
    ],
  },
  {
    name: "রাগ যমন",
    notes: [
      { freq: 523.25, dur: 0.6 },
      { freq: 587.33, dur: 0.5 },
      { freq: 659.25, dur: 0.7 },
      { freq: 739.99, dur: 0.8 },
      { freq: 783.99, dur: 0.6 },
      { freq: 739.99, dur: 0.5 },
      { freq: 659.25, dur: 0.6 },
      { freq: 587.33, dur: 0.5 },
      { freq: 523.25, dur: 0.7 },
      { freq: 493.88, dur: 0.6 },
      { freq: 523.25, dur: 0.5 },
      { freq: 587.33, dur: 0.7 },
      { freq: 659.25, dur: 0.8 },
      { freq: 739.99, dur: 0.6 },
      { freq: 783.99, dur: 1.1 },
    ],
  },
  {
    name: "রাগ কানাড়া",
    notes: [
      { freq: 293.66, dur: 0.6 },
      { freq: 329.63, dur: 0.5 },
      { freq: 349.23, dur: 0.7 },
      { freq: 392.0, dur: 0.6 },
      { freq: 440.0, dur: 0.8 },
      { freq: 493.88, dur: 0.5 },
      { freq: 440.0, dur: 0.6 },
      { freq: 392.0, dur: 0.5 },
      { freq: 349.23, dur: 0.6 },
      { freq: 329.63, dur: 0.7 },
      { freq: 293.66, dur: 0.8 },
      { freq: 329.63, dur: 0.5 },
      { freq: 349.23, dur: 0.6 },
      { freq: 392.0, dur: 0.6 },
      { freq: 440.0, dur: 0.7 },
      { freq: 493.88, dur: 1.0 },
    ],
  },
];

function playMelody(
  ctx: AudioContext,
  melodyIndex: number,
  onEnd: () => void,
): () => void {
  const melody = MELODIES[melodyIndex];
  let cancelled = false;

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.55;

  // Reverb-like delay
  const delay = ctx.createDelay(1.5);
  delay.delayTime.value = 0.45;
  const delayGain = ctx.createGain();
  delayGain.gain.value = 0.22;
  delay.connect(delayGain);
  delayGain.connect(delay);
  delayGain.connect(masterGain);
  masterGain.connect(ctx.destination);

  // Soft low-pass filter for warmth
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  filter.Q.value = 0.8;
  filter.connect(masterGain);

  let cursor = ctx.currentTime + 0.05;
  let totalDuration = 0;

  for (const { freq, dur } of melody.notes) {
    const osc = ctx.createOscillator();
    const env = ctx.createGain();

    // Vibrato (flute-like)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 5 + Math.random() * 1.5;
    lfoGain.gain.value = 3.5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(cursor);
    lfo.stop(cursor + dur + 0.1);

    // Breath noise layer
    const bufferSize = ctx.sampleRate * (dur + 0.1);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++)
      data[i] = (Math.random() * 2 - 1) * 0.018;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = freq;
    noiseFilter.Q.value = 12;
    noise.connect(noiseFilter);
    noiseFilter.connect(filter);
    noise.start(cursor);
    noise.stop(cursor + dur + 0.05);

    osc.type = "sine";
    osc.frequency.value = freq;

    env.gain.setValueAtTime(0, cursor);
    env.gain.linearRampToValueAtTime(0.5, cursor + 0.1);
    env.gain.setValueAtTime(0.5, cursor + dur - 0.15);
    env.gain.linearRampToValueAtTime(0, cursor + dur);

    osc.connect(env);
    env.connect(filter);
    env.connect(delay);

    osc.start(cursor);
    osc.stop(cursor + dur + 0.05);

    cursor += dur - 0.06;
    totalDuration = cursor;
  }

  const endTimeout = setTimeout(
    () => {
      if (!cancelled) onEnd();
    },
    (totalDuration - ctx.currentTime + 0.8) * 1000,
  );

  return () => {
    cancelled = true;
    clearTimeout(endTimeout);
    masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
  };
}

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const stopCurrentRef = useRef<(() => void) | null>(null);
  const trackIndexRef = useRef(trackIndex);
  trackIndexRef.current = trackIndex;

  const stopAll = useCallback(() => {
    if (stopCurrentRef.current) {
      stopCurrentRef.current();
      stopCurrentRef.current = null;
    }
  }, []);

  const playNext = useCallback(
    (ctx: AudioContext, idx: number) => {
      stopAll();
      const nextIdx = idx % MELODIES.length;
      setTrackIndex(nextIdx);
      trackIndexRef.current = nextIdx;
      const cancel = playMelody(ctx, nextIdx, () => {
        const next = (trackIndexRef.current + 1) % MELODIES.length;
        playNext(ctx, next);
      });
      stopCurrentRef.current = cancel;
    },
    [stopAll],
  );

  const start = useCallback(() => {
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      if (ctx.state === "suspended") ctx.resume();
      setIsPlaying(true);
      setStarted(true);
      playNext(ctx, 0);
    } catch {
      // audio not available
    }
  }, [playNext]);

  const pause = useCallback(() => {
    stopAll();
    setIsPlaying(false);
    if (ctxRef.current) ctxRef.current.suspend();
  }, [stopAll]);

  const resume = useCallback(() => {
    if (!ctxRef.current) {
      start();
      return;
    }
    ctxRef.current.resume();
    setIsPlaying(true);
    playNext(ctxRef.current, trackIndexRef.current);
  }, [start, playNext]);

  const nextTrack = useCallback(() => {
    if (!ctxRef.current || !isPlaying) return;
    const next = (trackIndexRef.current + 1) % MELODIES.length;
    playNext(ctxRef.current, next);
  }, [isPlaying, playNext]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
      ctxRef.current?.close();
    };
  }, [stopAll]);

  return {
    isPlaying,
    started,
    trackName: MELODIES[trackIndex].name,
    trackIndex,
    totalTracks: MELODIES.length,
    start,
    pause,
    resume,
    nextTrack,
  };
}
