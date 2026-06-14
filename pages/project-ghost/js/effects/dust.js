import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'dust',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'dust', intensity: 1, quantity: 85, spawn: 'full', spawnRate: 18,
      color: '#d8c6a2', opacity: [0.08, 0.26], size: [1, 5], vx: [-8, 12], vy: [-12, 16],
      life: [5, 12], fade: 'inout', wind: 10
    });
  }
};
