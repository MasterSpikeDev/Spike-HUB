import embers from './embers.js';
export default { ...embers, id:'fire', create(manager, config={}){ embers.create.call(this, manager, { quantity:130, spawnRate:70, speed:105, opacity:.8, size:4, color:'#ff5a1f', ...config }); } };
