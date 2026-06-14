import { createParticleEffect } from './particleEffect.js';

export default {
  id: 'snow',
  create(manager, config = {}) {
    return createParticleEffect(manager, config, {
      id: 'snow', intensity: 1, quantity: 130, spawn: 'top', spawnRate: 55,
      color: '#ffffff', opacity: [0.28, 0.78], size: [2, 7], vx: [-20, 20], vy: [18, 74],
      life: [6, 13], blend: 'screen', fade: 'inout', wind: 22
    });
  }
};
