import smoke from './smoke.js';
export default { ...smoke, id:'fog', create(manager, config={}){ smoke.create.call(this, manager, { quantity:55, spawnRate:8, speed:16, opacity:.22, size:95, spread:2.4, color:'rgba(210,215,220,.34)', ...config }); } };
