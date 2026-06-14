export default class EffectManager {
  constructor({ canvas, root = document.documentElement, audioHost = null, getMuted = () => false, getVolume = () => 1 } = {}) {
    if (!canvas) throw new Error('EffectManager requires a canvas element.');
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.root = root;
    this.audioHost = audioHost;
    this.getMutedState = getMuted;
    this.getVolumeState = getVolume;
    this.registry = new Map();
    this.active = new Map();
    this.width = 1;
    this.height = 1;
    this.pixelRatio = 1;
    this.raf = null;
    this.lastTime = 0;
    this.visible = !document.hidden;
    this.screenPulse = 0;
    this.boundTick = (time) => this.tick(time);
    this.boundResize = () => this.resize();
    this.boundVisibility = () => this.handleVisibilityChange();
    window.addEventListener('resize', this.boundResize, { passive: true });
    document.addEventListener('visibilitychange', this.boundVisibility, { passive: true });
    this.resize();
  }

  register(effectModule) {
    if (!effectModule?.id || typeof effectModule.create !== 'function') return;
    this.registry.set(effectModule.id, effectModule);
  }

  registerMany(effectModules = []) {
    effectModules.forEach((effectModule) => this.register(effectModule));
  }

  preload(effectConfigs = []) {
    effectConfigs.forEach((config) => {
      const module = this.registry.get(config?.id);
      if (module?.preload) module.preload(this, config);
    });
  }

  applyEffects(effectConfigs = []) {
    const nextConfigs = Array.isArray(effectConfigs) ? effectConfigs.filter((item) => item?.id) : [];
    const nextIds = new Set(nextConfigs.map((item) => item.id));
    nextConfigs.forEach((config) => this.activate(config.id, config));
    this.active.forEach((entry, id) => {
      if (!nextIds.has(id)) this.deactivate(id, entry.config?.fadeOut);
    });
    if (this.active.size) this.start();
    else this.clear();
  }

  activate(id, config = {}) {
    const module = this.registry.get(id);
    if (!module) {
      console.warn(`EffectManager: efeito "${id}" não registrado.`);
      return;
    }

    const existing = this.active.get(id);
    if (existing) {
      existing.config = { ...existing.config, ...config };
      existing.fadeDirection = 1;
      existing.fadeDuration = Math.max(1, Number(config.fadeIn ?? existing.config.fadeIn ?? 450));
      if (typeof existing.instance.configure === 'function') existing.instance.configure(existing.config);
      return;
    }

    const instance = module.create(this, config);
    if (typeof instance?.resize === 'function') instance.resize(this.width, this.height, this.pixelRatio);
    this.active.set(id, {
      id,
      instance,
      config,
      opacity: 0,
      fadeDirection: 1,
      fadeDuration: Math.max(1, Number(config.fadeIn ?? 450))
    });
  }

  deactivate(id, fadeOut = 450) {
    const entry = this.active.get(id);
    if (!entry) return;
    entry.fadeDirection = -1;
    entry.fadeDuration = Math.max(1, Number(fadeOut ?? entry.config?.fadeOut ?? 450));
  }

  resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, window.innerWidth);
    const height = Math.max(1, window.innerHeight);
    if (this.width === width && this.height === height && this.pixelRatio === ratio) return;
    this.width = width;
    this.height = height;
    this.pixelRatio = ratio;
    this.canvas.width = Math.floor(width * ratio);
    this.canvas.height = Math.floor(height * ratio);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.active.forEach((entry) => {
      if (typeof entry.instance?.resize === 'function') entry.instance.resize(width, height, ratio);
    });
    this.clear();
  }

  handleVisibilityChange() {
    this.visible = !document.hidden;
    if (this.visible && this.active.size) this.start();
    if (!this.visible) this.stop(false);
  }

  start() {
    if (this.raf || !this.visible) return;
    this.lastTime = performance.now();
    this.raf = requestAnimationFrame(this.boundTick);
  }

  stop(clearCanvas = true) {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = null;
    if (clearCanvas) this.clear();
  }

  tick(time) {
    this.raf = null;
    if (!this.visible) return;
    const delta = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    this.clear();
    this.screenPulse = 0;
    let hasRenderableEffect = false;
    let strongestPulse = 0;

    this.active.forEach((entry, id) => {
      const fadeStep = delta * 1000 / entry.fadeDuration;
      entry.opacity += entry.fadeDirection * fadeStep;
      entry.opacity = Math.min(Math.max(entry.opacity, 0), 1);
      if (entry.opacity <= 0 && entry.fadeDirection < 0) {
        entry.instance?.destroy?.();
        this.active.delete(id);
        return;
      }
      if (entry.opacity <= 0.001) return;
      entry.instance?.update?.(delta);
      entry.instance?.render?.(this.ctx, entry.opacity);
      hasRenderableEffect = true;
      strongestPulse = Math.max(strongestPulse, this.screenPulse);
    });

    if (!hasRenderableEffect) this.clear();
    this.root.style.setProperty('--effects-heartbeat-scale', String(Math.min(strongestPulse * 0.018, 0.032)));
    if (this.active.size) this.raf = requestAnimationFrame(this.boundTick);
    else this.root.style.setProperty('--effects-heartbeat-scale', '0');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  setScreenPulse(value) {
    this.screenPulse = Math.max(0, Number(value) || 0);
  }

  isMuted() {
    return Boolean(this.getMutedState());
  }

  getVolume() {
    return Math.min(Math.max(Number(this.getVolumeState()) || 0, 0), 1);
  }

  setAudioState() {
    this.active.forEach((entry) => entry.instance?.setAudioState?.(this.isMuted(), this.getVolume()));
  }

  destroy() {
    this.stop();
    this.active.forEach((entry) => entry.instance?.destroy?.());
    this.active.clear();
    window.removeEventListener('resize', this.boundResize);
    document.removeEventListener('visibilitychange', this.boundVisibility);
    this.root.style.setProperty('--effects-heartbeat-scale', '0');
  }
}
