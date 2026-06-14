import fire from './fire.js';

export default {
  id: 'embers',
  create(manager, config = {}) {
    return fire.create(manager, {
      quantity: 85, spawnRate: 34, color: '#ffb347', opacity: [0.24, 0.86], size: [2, 7],
      vx: [-28, 28], vy: [-120, -24], life: [1.7, 4.6], wind: 30, ...config, id: 'embers'
    });
  }
};
