import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'smoke',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'smoke', intensity: 1, quantity: 70, spawn: 'bottom', spawnRate: 30,
      color: '#8b8585', opacity: [0.08, 0.26], size: [42, 125], vx: [-20, 20], vy: [-54, -14],
      life: [3.5, 7], blend: 'source-over', fade: 'inout', wind: 24
    });
  }
};
