import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'voidParticles',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'voidParticles', intensity: 1, quantity: 95, spawn: 'edges', spawnRate: 45,
      color: '#8f4cff', opacity: [0.16, 0.56], size: [4, 18], vx: [-34, 34], vy: [-34, 34],
      life: [3, 8], blend: 'lighter', fade: 'inout', wind: 8
    });
  }
};
