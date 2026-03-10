export function useFluteMelody() {
  const playFlute = () => {
    try {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();

      const delay = ctx.createDelay(1.0);
      delay.delayTime.value = 0.3;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.25;
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.7;

      delay.connect(delayGain);
      delayGain.connect(delay);
      delayGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      const melody = [
        { freq: 523.25, start: 0.0, dur: 0.55 },
        { freq: 659.25, start: 0.4, dur: 0.55 },
        { freq: 783.99, start: 0.8, dur: 0.55 },
        { freq: 880.0, start: 1.2, dur: 0.65 },
        { freq: 783.99, start: 1.75, dur: 0.5 },
        { freq: 659.25, start: 2.15, dur: 0.5 },
        { freq: 523.25, start: 2.55, dur: 0.9 },
      ];

      for (const { freq, start, dur } of melody) {
        const osc = ctx.createOscillator();
        const envGain = ctx.createGain();

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 5.5;
        lfoGain.gain.value = 4;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(ctx.currentTime + start);
        lfo.stop(ctx.currentTime + start + dur + 0.1);

        osc.type = "sine";
        osc.frequency.value = freq;

        envGain.gain.setValueAtTime(0, ctx.currentTime + start);
        envGain.gain.linearRampToValueAtTime(
          0.55,
          ctx.currentTime + start + 0.07,
        );
        envGain.gain.setValueAtTime(0.55, ctx.currentTime + start + dur - 0.12);
        envGain.gain.linearRampToValueAtTime(0, ctx.currentTime + start + dur);

        osc.connect(envGain);
        envGain.connect(masterGain);
        envGain.connect(delay);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur + 0.05);
      }

      setTimeout(() => {
        ctx.close();
      }, 4500);
    } catch {
      // Silently fail if audio is not available
    }
  };

  return { playFlute };
}
