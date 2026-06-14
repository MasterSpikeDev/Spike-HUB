import embers from './embers.js';

export default {
  id: 'sparks',
  create(manager, config = {}) {
    return embers.create(manager, {
      quantity: 120, spawnRate: 90, color: '#fff0a8', opacity: [0.38, 1], size: [1, 4],
      vx: [-95, 95], vy: [-220, -45], life: [0.55, 1.8], ...config, id: 'sparks'
    });
  }
};
