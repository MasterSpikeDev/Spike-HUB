export default {
  id: 'heartbeat',
  create(manager, config = {}) {
    this.manager = manager;
    this.config = {
      bpm: 72,
      intensity: .45,
      overlayIntensity: null,
      overlayDuration: 260,
      overlayFadeOut: 520,
      volume: .3,
      color: 'rgba(255, 0, 42, 1)',
      edgeOpacity: .5,
      fadeIn: 350,
      fadeOut: 500,
      ...config
    };
    this.opacity = 0;
    this.targetOpacity = 1;
    this.phase = 0;
    this.audio = null;
    this.nextBeatAt = 0;
    this.previousCycle = 1;
    this.overlayLevel = 0;
    this.overlayHoldRemaining = 0;
    this.isStopping = false;
    this.ensureAudio();
  },
  preload(manager, config = {}) {
    const src = config.sound;
    if (!src) return;
    const audio = manager.getSharedAudio(`heartbeat:${src}`);
    audio.preload = 'auto';
    audio.src = src;
    audio.load();
  },
  setConfig(config = {}) {
    this.config = { ...this.config, ...config };
    this.targetOpacity = 1;
    this.isStopping = false;
    this.ensureAudio();
  },
  ensureAudio() {
    if (!this.config.sound) return;
    const src = this.config.sound;
    this.audio = this.manager.getSharedAudio(`heartbeat:${src}`);
    if (this.audio.getAttribute('data-src') !== src) {
      this.audio.src = src;
      this.audio.setAttribute('data-src', src);
      this.audio.load();
    }
    this.audio.loop = false;
  },
  stop() {
    this.isStopping = true;
    this.targetOpacity = 0;
  },
  update(delta) {
    const bpm = Math.max(20, Number(this.config.bpm) || 72);
    const intensity = Math.max(0, Math.min(2, Number(this.config.intensity ?? .45)));
    const fadeMs = this.targetOpacity > this.opacity ? Number(this.config.fadeIn || 350) : Number(this.config.fadeOut || 500);
    const step = delta * 1000 / Math.max(1, fadeMs);
    this.opacity = this.targetOpacity > this.opacity ? Math.min(1, this.opacity + step) : Math.max(0, this.opacity - step);
    if (this.isStopping && this.opacity <= .001) {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.manager.setPagePulse(0);
      return true;
    }

    this.phase += delta * (bpm / 60);
    const cycle = this.phase % 1;
    const firstBeat = Math.max(0, 1 - Math.abs(cycle - .03) / .09);
    const secondBeat = Math.max(0, 1 - Math.abs(cycle - .18) / .12) * .58;
    const pulse = Math.max(firstBeat, secondBeat);
    const eased = pulse * pulse * intensity * this.opacity;
    this.manager.setPagePulse(eased);
    this.updateOverlay(delta, cycle, pulse);
    this.drawVignette();
    this.playBeatIfNeeded(cycle);
    this.previousCycle = cycle;
    return false;
  },
  updateOverlay(delta, cycle, pulse) {
    const beatStarted = cycle < this.previousCycle || (pulse > .72 && this.previousCycle > .28);
    if (beatStarted) {
      this.overlayHoldRemaining = Math.max(0, Number(this.config.overlayDuration ?? 260)) / 1000;
      this.overlayLevel = 1;
    } else if (this.overlayHoldRemaining > 0) {
      this.overlayHoldRemaining = Math.max(0, this.overlayHoldRemaining - delta);
    } else {
      const fadeOut = Math.max(1, Number(this.config.overlayFadeOut ?? 520)) / 1000;
      this.overlayLevel = Math.max(0, this.overlayLevel - delta / fadeOut);
    }
  },
  playBeatIfNeeded(cycle) {
    if (!this.audio || this.manager.isMuted()) return;
    if (cycle > .08 || performance.now() < this.nextBeatAt) return;
    this.nextBeatAt = performance.now() + (60000 / Math.max(20, Number(this.config.bpm) || 72)) * .7;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.muted = this.manager.isMuted();
    this.audio.volume = Math.max(0, Math.min(1, (Number(this.config.volume ?? .3)) * this.manager.getVolume()));
    this.audio.play().catch(() => {});
  },
  drawVignette() {
    const ctx = this.manager.ctx;
    const w = this.manager.width;
    const h = this.manager.height;
    const overlayIntensity = this.config.overlayIntensity == null
      ? Math.max(0, Math.min(2, Number(this.config.intensity ?? .45)))
      : Math.max(0, Math.min(2, Number(this.config.overlayIntensity)));
    const amount = this.overlayLevel * overlayIntensity * this.opacity;
    if (!ctx || amount <= 0 || !w || !h) return;
    const edgeOpacity = Math.max(0, Math.min(1, Number(this.config.edgeOpacity ?? .5)));
    ctx.save();
    const radius = Math.max(w, h) * (.42 + amount * .035);
    const gradient = ctx.createRadialGradient(w / 2, h / 2, Math.max(1, radius * .18), w / 2, h / 2, radius);
    gradient.addColorStop(0, 'rgba(255,0,0,0)');
    gradient.addColorStop(.58, 'rgba(255,0,0,0)');
    gradient.addColorStop(1, this.withAlpha(this.config.color, Math.min(.82, amount * edgeOpacity)));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  },
  withAlpha(color, alpha) {
    if (typeof color !== 'string') return `rgba(255,0,42, ${alpha})`;
    if (color.startsWith('rgba')) return color.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
    if (color.startsWith('rgb(')) return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
    const hex = color.trim().replace('#', '');
    if (/^[0-9a-f]{6}$/i.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  },
  destroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.manager.setPagePulse(0);
  }
};
