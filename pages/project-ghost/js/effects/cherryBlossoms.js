import { createParticleEffect } from './particleEffectFactory.js';

export default createParticleEffect({
  id: 'cherryBlossoms',
  defaults: {
    quantity: 70,
    spawnRate: 16,
    speed: 48,
    color: 'rgba(255, 185, 215, .9)',
    opacity: .72,
    size: 6,
    wind: 28
  },
  spawn(effect, initial) {
    const h = effect.helpers;
    return {
      x: h.randomBetween(-40, effect.manager.width + 40),
      y: initial ? h.randomBetween(-20, effect.manager.height) : -30,
      vy: h.randomBetween(.45, 1.05) * (effect.config.speed || 48),
      vx: h.randomBetween(-18, 24) + (effect.config.wind || 28),
      size: h.randomBetween(3, effect.config.size || 6),
      rotation: Math.random() * h.TAU,
      spin: h.randomBetween(-2.4, 2.4),
      sway: h.randomBetween(.8, 2.2),
      alpha: h.randomBetween(.45, 1)
    };
  },
  reset(effect, particle) {
    Object.assign(particle, this.spawn(effect, false));
  },
  step(effect, particle, delta) {
    particle.rotation += particle.spin * delta;
    particle.x += (particle.vx + Math.sin(particle.rotation * particle.sway) * 18) * delta;
    particle.y += particle.vy * delta;
  },
  isDead(effect, particle) {
    return particle.y > effect.manager.height + 40 || particle.x < -80 || particle.x > effect.manager.width + 80;
  },
  draw(effect, particle, ctx, opacity) {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.globalAlpha = (effect.config.opacity ?? .72) * particle.alpha * opacity;
    ctx.fillStyle = effect.config.color || 'rgba(255, 185, 215, .9)';
    ctx.beginPath();
    ctx.ellipse(0, 0, particle.size * .72, particle.size * .34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
});
