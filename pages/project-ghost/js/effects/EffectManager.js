export default class EffectManager {
  constructor({ canvas, overlayCanvas = null, pageHost = null, getMuted = () => false, getVolume = () => 1 } = {}) {
    this.canvases = {
      background: canvas,
      page: overlayCanvas || canvas
    };
    this.contexts = {
      background: this.canvases.background?.getContext('2d', { alpha:true }) || null,
      page: this.canvases.page?.getContext('2d', { alpha:true }) || null
    };
    this.canvas = this.canvases.background;
    this.ctx = this.contexts.background;
    this.width = 0;
    this.height = 0;
    this.registry = new Map();
    this.active = new Map();
    this.sharedAudios = new Map();
    this.getMutedState = getMuted;
    this.getVolumeState = getVolume;
    this.pageHost = pageHost;
    this.pagePulse = 0;
    this.raf = null;
    this.lastTime = 0;
    this.visible = document.visibilityState !== 'hidden';
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    this.onVisibilityChange = this.onVisibilityChange.bind(this);
    window.addEventListener('resize', this.resize, { passive:true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.resize();
  }

  register(effectModule) {
    if (effectModule?.id) this.registry.set(effectModule.id, effectModule);
  }

  registerMany(effectModules) {
    effectModules.forEach((effect) => this.register(effect));
  }

  preload(effects = []) {
    effects.forEach((config) => this.registry.get(config?.id)?.preload?.(this, config));
  }

  getEffectLayer(config = {}) {
    return config.overPdf || config.layer === 'page' || config.layer === 'pdf' ? 'page' : 'background';
  }

  getEffectKey(config = {}) {
    return config.key || `${config.id}:${this.getEffectLayer(config)}`;
  }

  setEffects(effects = []) {
    const nextKeys = new Set();
    effects.filter(Boolean).forEach((config) => {
      const id = config.id;
      const module = this.registry.get(id);
      if (!module) return console.warn(`Efeito não registrado: ${id}`);
      const layer = this.getEffectLayer(config);
      const key = this.getEffectKey(config);
      nextKeys.add(key);
      const nextConfig = { ...config, layer };
      const current = this.active.get(key);
      if (current) current.setConfig?.(nextConfig);
      else {
        const instance = Object.create(module);
        instance.layer = layer;
        instance.create(this, nextConfig);
        this.active.set(key, instance);
      }
    });
    this.active.forEach((instance, key) => {
      if (!nextKeys.has(key)) instance.stop?.();
    });
    this.updateCanvasVisibility();
    this.start();
  }

  clear() {
    this.setEffects([]);
  }

  start() {
    if (!this.raf && this.visible && this.active.size) {
      this.lastTime = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  tick(now) {
    this.raf = null;
    if (!this.visible) return;
    const delta = Math.min(.05, Math.max(.001, (now - this.lastTime) / 1000));
    this.lastTime = now;
    this.clearCanvases();
    this.resetPagePulse();
    this.active.forEach((instance, key) => {
      this.useLayer(instance.layer || 'background');
      if (instance.update(delta)) {
        instance.destroy?.();
        this.active.delete(key);
      }
    });
    this.updateCanvasVisibility();
    if (this.active.size) this.raf = requestAnimationFrame(this.tick);
  }

  useLayer(layer) {
    const selected = this.canvases[layer] ? layer : 'background';
    this.canvas = this.canvases[selected];
    this.ctx = this.contexts[selected];
  }

  clearCanvases() {
    Object.entries(this.contexts).forEach(([layer, ctx]) => {
      const canvas = this.canvases[layer];
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.floor(window.innerWidth * dpr));
    const h = Math.max(1, Math.floor(window.innerHeight * dpr));
    Object.values(this.canvases).forEach((canvas) => {
      if (!canvas) return;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
      }
    });
    this.width = w;
    this.height = h;
  }

  onVisibilityChange() {
    this.visible = document.visibilityState !== 'hidden';
    if (!this.visible && this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = null;
    }
    if (this.visible) this.start();
  }

  updateCanvasVisibility() {
    const activeLayers = new Set([...this.active.values()].map((instance) => instance.layer || 'background'));
    Object.entries(this.canvases).forEach(([layer, canvas]) => {
      if (canvas) canvas.style.opacity = activeLayers.has(layer) ? '1' : '0';
    });
  }

  resetPagePulse() {
    this.pagePulse = Math.max(0, this.pagePulse * .82 - .01);
    this.applyPagePulse();
  }

  setPagePulse(amount = 0) {
    this.pagePulse = Math.max(this.pagePulse, Math.max(0, Math.min(1.5, amount)));
    this.applyPagePulse();
  }

  applyPagePulse() {
    if (!this.pageHost) return;
    const pulse = this.pagePulse;
    if (pulse <= .001) {
      this.pageHost.style.transform = '';
      this.pageHost.style.filter = '';
      return;
    }
    const z = pulse * 42;
    const scale = 1 + pulse * .026;
    const rotate = Math.sin(performance.now() / 38) * pulse * .22;
    this.pageHost.style.transform = `perspective(900px) translateZ(${z}px) scale(${scale}) rotateX(${rotate}deg)`;
    this.pageHost.style.filter = `drop-shadow(0 ${Math.round(10 + pulse * 20)}px ${Math.round(35 + pulse * 40)}px rgba(0,0,0,${Math.min(.65, .35 + pulse * .25)}))`;
  }

  isMuted() {
    return Boolean(this.getMutedState());
  }

  getVolume() {
    return Math.max(0, Math.min(1, Number(this.getVolumeState()) || 0));
  }

  syncAudioState() {
    this.sharedAudios.forEach((audio) => {
      audio.muted = this.isMuted();
      audio.volume = this.getVolume();
    });
  }

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
    this.sharedAudios.forEach((audio) => {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
    });
    this.sharedAudios.clear();
    this.resetPagePulse();
    this.clearCanvases();
    this.updateCanvasVisibility();
  }
}
