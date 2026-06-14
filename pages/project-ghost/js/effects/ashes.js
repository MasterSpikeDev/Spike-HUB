import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'ashes',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'ashes', intensity: 1, quantity: 90, spawn: 'top', spawnRate: 36,
      color: '#d8c5ad', opacity: [0.12, 0.42], size: [2, 8], vx: [-28, 22], vy: [16, 70],
      life: [5, 11], shape: 'leaf', fade: 'inout', wind: 34, spin: [-1.2, 1.2]
    });
  }
};
