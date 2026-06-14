export default class EffectManager {
  constructor({ canvas, getMuted = () => false, getVolume = () => 1 } = {}) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d', { alpha:true }) || null;
    this.registry = new Map();
    this.active = new Map();
    this.sharedAudios = new Map();
    this.getMutedState = getMuted;
    this.getVolumeState = getVolume;
    this.raf = null;
    this.lastTime = 0;
    this.width = 0;
    this.height = 0;
    this.running = false;
    this.visible = document.visibilityState !== 'hidden';
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    window.addEventListener('resize', this.resize, { passive:true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.resize();
  }
  register(effectModule) { if (effectModule?.id) this.registry.set(effectModule.id, effectModule); }
  registerMany(effectModules) { effectModules.forEach((effect) => this.register(effect)); }
  preload(effects = []) { effects.forEach((config) => this.registry.get(config?.id)?.preload?.(this, config)); }
  setEffects(effects = []) {
    const nextIds = new Set();
    effects.filter(Boolean).forEach((config) => {
      const id = config.id;
      const module = this.registry.get(id);
      if (!module) return console.warn(`Efeito não registrado: ${id}`);
      nextIds.add(id);
      const current = this.active.get(id);
      if (current) current.setConfig?.(config);
      else {
        const instance = Object.create(module);
        instance.create(this, config);
        this.active.set(id, instance);
      }
    });
    this.active.forEach((instance, id) => { if (!nextIds.has(id)) instance.stop?.(); });
    this.updateCanvasVisibility();
    this.start();
  }
  clear() { this.setEffects([]); }
  start() { if (!this.raf && this.visible && this.active.size) { this.lastTime = performance.now(); this.raf = requestAnimationFrame(this.tick); } }
  tick(now) {
    this.raf = null;
    if (!this.visible) return;
    const delta = Math.min(.05, Math.max(.001, (now - this.lastTime) / 1000));
    this.lastTime = now;
    if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
    this.active.forEach((instance, id) => {
      if (instance.update(delta)) { instance.destroy?.(); this.active.delete(id); }
    });
    this.updateCanvasVisibility();
    if (this.active.size) this.raf = requestAnimationFrame(this.tick);
  }
  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(window.innerWidth * dpr));
    const h = Math.max(1, Math.floor(window.innerHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w; this.canvas.height = h; this.width = w; this.height = h;
      this.canvas.style.width = '100%'; this.canvas.style.height = '100%';
    }
  }
  onVisibilityChange() {
    this.visible = document.visibilityState !== 'hidden';
    if (!this.visible && this.raf) { cancelAnimationFrame(this.raf); this.raf = null; }
    if (this.visible) this.start();
  }
  updateCanvasVisibility() { if (this.canvas) this.canvas.style.opacity = this.active.size ? '1' : '0'; }
  isMuted() { return Boolean(this.getMutedState()); }
  getVolume() { return Math.max(0, Math.min(1, Number(this.getVolumeState()) || 0)); }
  syncAudioState() { this.sharedAudios.forEach((audio) => { audio.muted = this.isMuted(); audio.volume = this.getVolume(); }); }
  getSharedAudio(key) {
    if (this.sharedAudios.has(key)) return this.sharedAudios.get(key);
    const audio = document.createElement('audio');
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.muted = this.isMuted();
    audio.volume = this.getVolume();
    this.sharedAudios.set(key, audio);
    return audio;
  }
  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.active.forEach((instance) => instance.destroy?.());
    this.active.clear();
    this.sharedAudios.forEach((audio) => { audio.pause(); audio.removeAttribute('src'); audio.load(); });
    this.sharedAudios.clear();
  }
}
