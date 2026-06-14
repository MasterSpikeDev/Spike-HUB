import { clamp } from './particleEffect.js';

export default {
  id: 'heartbeat',
  create(manager, config = {}) {
    let settings = { ...config };
    let bpm = Math.max(30, Number(settings.bpm) || 72);
    let intensity = clamp(settings.intensity ?? 0.5, 0, 1.5);
    let beatTimer = 0;
    let pulse = 0;
    let audio = null;

    function ensureAudio() {
      if (!settings.sound || audio) return audio;
      audio = new Audio(settings.sound);
      audio.preload = 'auto';
      audio.playsInline = true;
      return audio;
    }

    async function playBeat() {
      const beatAudio = ensureAudio();
      if (!beatAudio || manager.isMuted()) return;
      beatAudio.volume = clamp((settings.volume ?? 0.3) * manager.getVolume(), 0, 1);
      try {
        beatAudio.currentTime = 0;
        await beatAudio.play();
      } catch {}
    }

    return {
      id: 'heartbeat',
      configure(nextConfig = {}) {
        const previousSound = settings.sound;
        settings = { ...settings, ...nextConfig };
        if (audio && settings.sound !== previousSound) {
          audio.pause();
          audio.removeAttribute('src');
          audio.load();
          audio = null;
        }
      },
      update(delta) {
        bpm = Math.max(30, Number(settings.bpm) || bpm);
        intensity = clamp(settings.intensity ?? intensity, 0, 1.5);
        beatTimer += delta;
        const interval = 60 / bpm;
        if (beatTimer >= interval) {
          beatTimer %= interval;
          pulse = 1;
          playBeat();
        }
        pulse = Math.max(0, pulse - delta * 2.8);
        manager.setScreenPulse(pulse * intensity);
      },
      render(ctx, opacity = 1) {
        const amount = pulse * intensity * opacity;
        if (amount <= 0.01) return;
        const { width, height } = manager;
        ctx.save();
        ctx.globalAlpha = Math.min(0.42, amount * 0.42);
        const gradient = ctx.createRadialGradient(width / 2, height / 2, Math.min(width, height) * 0.12, width / 2, height / 2, Math.max(width, height) * 0.72);
        gradient.addColorStop(0, 'rgba(80, 0, 0, 0)');
        gradient.addColorStop(0.62, 'rgba(120, 0, 0, 0.22)');
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.92)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      },
      destroy() {
        manager.setScreenPulse(0);
        if (!audio) return;
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
        audio = null;
      }
    };
  }
};
