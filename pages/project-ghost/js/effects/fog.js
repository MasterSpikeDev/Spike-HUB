import smoke from './smoke.js';

export default {
  id: 'fog',
  create(manager, config = {}) {
    return smoke.create(manager, {
      quantity: 55, spawn: 'full', spawnRate: 14, color: '#cfd4dc', opacity: [0.05, 0.17],
      size: [90, 220], vx: [-10, 16], vy: [-8, 8], life: [8, 18], wind: 18, ...config, id: 'fog'
    });
  }
};
