const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function parseColor(color, fallback) {
  return typeof color === 'string' && color.trim() ? color.trim() : fallback;
}

function shouldLoop(config) {
  return config.loop !== false;
}

function getIntensity(config) {
  return clamp(Number(config.intensity ?? 1), 0, 3);
}

export function createParticleEffect(definition) {
  const defaults = definition.defaults || {};
  return {
    id: definition.id,
    create(manager, config = {}) {
      this.manager = manager;
      this.config = { ...defaults, ...config };
      this.particles = [];
      this.spawnCarry = 0;
      this.elapsed = 0;
      this.opacity = 0;
      this.targetOpacity = 1;
      this.fadeIn = Math.max(1, Number(this.config.fadeIn ?? 650));
      this.fadeOut = Math.max(1, Number(this.config.fadeOut ?? 650));
      this.isStopping = false;
      this.seedInitialParticles();
    },
    preload() {},
    setConfig(config = {}) {
      this.config = { ...this.config, ...config };
      this.fadeIn = Math.max(1, Number(this.config.fadeIn ?? this.fadeIn));
      this.fadeOut = Math.max(1, Number(this.config.fadeOut ?? this.fadeOut));
      this.targetOpacity = 1;
      this.isStopping = false;
    },
    seedInitialParticles() {
      const count = this.getMaxParticles();
      for (let i = 0; i < count; i += 1) {
        this.particles.push(definition.spawn(this, true));
      }
    },
    getMaxParticles() {
      const quantity = Math.max(0, Number(this.config.quantity ?? defaults.quantity ?? 80));
      const configuredMax = this.config.maxParticles == null ? Infinity : Math.max(0, Number(this.config.maxParticles));
      const intensity = getIntensity(this.config);
      if (intensity <= 0) return 0;
      return Math.floor(Math.min(quantity * Math.max(intensity, 0.05), configuredMax));
    },
    stop() {
      this.isStopping = true;
      this.targetOpacity = 0;
    },
    update(delta) {
      const ctx = this.manager.ctx;
      const { width, height } = this.manager;
      if (!ctx || !width || !height) return this.isStopping && this.opacity <= 0.001;
      const fadeDuration = this.targetOpacity > this.opacity ? this.fadeIn : this.fadeOut;
      const fadeStep = delta * 1000 / fadeDuration;
      this.opacity = this.targetOpacity > this.opacity
        ? Math.min(this.targetOpacity, this.opacity + fadeStep)
        : Math.max(this.targetOpacity, this.opacity - fadeStep);
      if (this.opacity <= 0.001 && this.isStopping) return true;

      const intensity = getIntensity(this.config);
      const maxParticles = this.getMaxParticles();
      if (this.particles.length > maxParticles) {
        this.particles.splice(maxParticles);
      }
      const spawnRate = Number(this.config.spawnRate ?? defaults.spawnRate ?? 20) * intensity;
      this.spawnCarry += spawnRate * delta;
      const loop = shouldLoop(this.config);
      while (loop && !this.isStopping && this.spawnCarry >= 1 && this.particles.length < maxParticles) {
        this.particles.push(definition.spawn(this, false));
        this.spawnCarry -= 1;
      }

      ctx.save();
      ctx.globalCompositeOperation = definition.composite || 'source-over';
      for (let i = this.particles.length - 1; i >= 0; i -= 1) {
        const p = this.particles[i];
        definition.step(this, p, delta);
        if (definition.isDead(this, p)) {
          if (this.isStopping || !loop) this.particles.splice(i, 1);
          else definition.reset(this, p);
          continue;
        }
        definition.draw(this, p, ctx, this.opacity);
      }
      ctx.restore();
      if (!loop && this.particles.length === 0) return true;
      return false;
    },
    destroy() {
      this.particles.length = 0;
    },
    helpers: { clamp, randomBetween, parseColor, TAU }
  };
}

export const particleUtils = { clamp, randomBetween, parseColor, TAU };
