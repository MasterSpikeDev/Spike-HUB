export default {
  id: 'heartbeat',
  create(manager, config = {}) {
    this.manager = manager;
    this.config = { bpm:72, intensity:.5, volume:.3, fadeIn:350, fadeOut:500, ...config };
    this.opacity = 0;
    this.targetOpacity = 1;
    this.phase = 0;
    this.audio = null;
    this.nextBeatAt = 0;
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
  stop() { this.isStopping = true; this.targetOpacity = 0; },
  update(delta) {
    const bpm = Math.max(20, Number(this.config.bpm) || 72);
    const intensity = Math.max(0, Math.min(2, Number(this.config.intensity ?? .5)));
    const fadeMs = this.targetOpacity > this.opacity ? Number(this.config.fadeIn || 350) : Number(this.config.fadeOut || 500);
    const step = delta * 1000 / Math.max(1, fadeMs);
    this.opacity = this.targetOpacity > this.opacity ? Math.min(1, this.opacity + step) : Math.max(0, this.opacity - step);
    if (this.isStopping && this.opacity <= .001) {
      if (this.audio) { this.audio.pause(); this.audio.currentTime = 0; }
      return true;
    }

    this.phase += delta * (bpm / 60);
    const cycle = this.phase % 1;
    const pulse = Math.max(0, 1 - Math.min(Math.abs(cycle - .02), Math.abs(cycle - .18)) / .14);
    const eased = pulse * pulse * intensity * this.opacity;
    this.draw(eased);
    this.playBeatIfNeeded(cycle);
    return false;
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
  draw(amount) {
    const ctx = this.manager.ctx;
    const w = this.manager.width;
    const h = this.manager.height;
    if (!ctx || amount <= 0 || !w || !h) return;
    ctx.save();
    ctx.globalAlpha = Math.min(.36, amount * .32);
    ctx.fillStyle = '#140000';
    ctx.fillRect(0, 0, w, h);
    const radius = Math.max(w, h) * (.48 + amount * .035);
    const gradient = ctx.createRadialGradient(w/2, h/2, Math.max(1, radius * .18), w/2, h/2, radius);
    gradient.addColorStop(0, 'rgba(255,0,0,0)');
    gradient.addColorStop(.62, `rgba(120,0,0,${amount * .16})`);
    gradient.addColorStop(1, `rgba(90,0,0,${amount * .42})`);
    ctx.globalAlpha = 1;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  },
  destroy() { if (this.audio) { this.audio.pause(); this.audio.currentTime = 0; } }
};
