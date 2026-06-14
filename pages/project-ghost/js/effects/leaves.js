import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'leaves',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'leaves', intensity: 1, quantity: 55, spawn: 'top', spawnRate: 20,
      color: '#b05a2a', opacity: [0.28, 0.74], size: [8, 18], vx: [-42, 44], vy: [28, 96],
      life: [5, 12], shape: 'leaf', fade: 'inout', wind: 48, spin: [-2.4, 2.4]
    });
  }
};
