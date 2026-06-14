import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'fire',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'fire', intensity: 1, quantity: 120, spawn: 'bottom', spawnRate: 90,
      color: '#ff6a1a', opacity: [0.22, 0.72], size: [18, 52], vx: [-16, 16], vy: [-135, -42],
      life: [0.8, 1.9], blend: 'lighter', fade: 'inout', wind: 18
    });
  }
};
