import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'rain',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'rain', intensity: 1, quantity: 180, spawn: 'top', spawnRate: 260,
      color: '#9fcaff', opacity: [0.22, 0.58], size: [5, 12], vx: [-90, -35], vy: [760, 1120],
      life: [0.55, 1.1], shape: 'line', lineWidthScale: 0.12, lineX: -12, lineY: 42, blend: 'screen'
    });
  }
};
