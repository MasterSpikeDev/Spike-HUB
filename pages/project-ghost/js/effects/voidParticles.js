const TAU = Math.PI * 2;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default {
  id: 'voidParticles',
  create(manager, config = {}) {
    this.manager = manager;
    this.config = {
      quantity: 120,
      spawnRate: 20,
      speed: 42,
      color: '#7c4dff',
      opacity: .5,
      size: 2.3,
      loop: true,
      origin: 'center',
      fadeIn: 650,
      fadeOut: 650,
      ...config
    };
    this.particles = [];
    this.spawnCarry = 0;
    this.opacity = 0;
    this.targetOpacity = 1;
    this.isStopping = false;
    this.fadeIn = Math.max(1, Number(this.config.fadeIn ?? 650));
    this.fadeOut = Math.max(1, Number(this.config.fadeOut ?? 650));
    this.seedInitialParticles();
  },
  preload() {},
  setConfig(config = {}) {
    this.config = { ...this.config, ...config };
    this.fadeIn = Math.max(1, Number(this.config.fadeIn ?? this.fadeIn));
    this.fadeOut = Math.max(1, Number(this.config.fadeOut ?? this.fadeOut));
    this.targetOpacity = 1;
    this.isStopping = false;
    this.trimToLimit();
  },
  getIntensity() {
    return clamp(Number(this.config.intensity ?? 1), 0, 3);
  },
  getMaxParticles() {
    const quantity = Math.max(0, Number(this.config.quantity ?? 120));
    const maxParticles = this.config.maxParticles == null ? Infinity : Math.max(0, Number(this.config.maxParticles));
    const intensity = this.getIntensity();
    if (intensity <= 0) return 0;
    return Math.floor(Math.min(quantity * Math.max(intensity, .05), maxParticles));
  },
  seedInitialParticles() {
    const total = this.getMaxParticles();
    for (let i = 0; i < total; i += 1) {
      this.particles.push(this.createParticle(true));
    }
  },
  trimToLimit() {
    const total = this.getMaxParticles();
    if (this.particles.length > total) this.particles.splice(total);
  },
  createParticle(initial = false) {
    const w = Math.max(1, this.manager.width);
    const h = Math.max(1, this.manager.height);
    const fromCenter = this.config.origin !== 'screen';
    return {
      x: initial || !fromCenter ? Math.random() * w : w / 2 + randomBetween(-80, 80),
      y: initial || !fromCenter ? Math.random() * h : h / 2 + randomBetween(-80, 80),
      angle: Math.random() * TAU,
      speed: randomBetween(.2, 1) * (Number(this.config.speed) || 42),
      r: randomBetween(.6, Number(this.config.size) || 2.3),
      phase: Math.random() * TAU,
      twinkle: randomBetween(1.2, 3.4),
      a: randomBetween(.25, 1)
    };
  },
  recycleParticle(particle) {
    Object.assign(particle, this.createParticle(false));
  },
  stop() {
    this.isStopping = true;
    this.targetOpacity = 0;
  },
  update(delta) {
    const ctx = this.manager.ctx;
    const w = this.manager.width;
    const h = this.manager.height;
    if (!ctx || !w || !h) return this.isStopping && this.opacity <= .001;

    const fadeDuration = this.targetOpacity > this.opacity ? this.fadeIn : this.fadeOut;
    const fadeStep = delta * 1000 / fadeDuration;
    this.opacity = this.targetOpacity > this.opacity
      ? Math.min(this.targetOpacity, this.opacity + fadeStep)
      : Math.max(this.targetOpacity, this.opacity - fadeStep);
    if (this.isStopping && this.opacity <= .001) return true;

    const loop = this.config.loop !== false;
    const intensity = this.getIntensity();
    const maxParticles = this.getMaxParticles();
    this.trimToLimit();
    this.spawnCarry += Number(this.config.spawnRate ?? 20) * intensity * delta;
    while (loop && !this.isStopping && this.spawnCarry >= 1 && this.particles.length < maxParticles) {
      this.particles.push(this.createParticle(false));
      this.spawnCarry -= 1;
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = this.particles.length - 1; i >= 0; i -= 1) {
      const particle = this.particles[i];
      particle.phase += delta * particle.twinkle;
      particle.angle += delta * .35;
      particle.x += Math.cos(particle.angle) * particle.speed * delta;
      particle.y += Math.sin(particle.angle) * particle.speed * delta;

      const margin = 24;
      const outside = particle.x < -margin || particle.x > w + margin || particle.y < -margin || particle.y > h + margin;
      if (outside) {
        if (loop && !this.isStopping) this.recycleParticle(particle);
        else this.particles.splice(i, 1);
        continue;
      }

      const pulse = .62 + Math.sin(particle.phase) * .38;
      ctx.globalAlpha = (Number(this.config.opacity ?? .5)) * particle.a * pulse * this.opacity;
      ctx.fillStyle = this.config.color || '#7c4dff';
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, TAU);
      ctx.fill();
    }
    ctx.restore();
    if (!loop && this.particles.length === 0) return true;
    return false;
  },
  destroy() {
    this.particles.length = 0;
  }
};
