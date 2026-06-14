import embers from './embers.js';
export default { ...embers, id:'sparks', create(manager, config={}){ embers.create.call(this, manager, { quantity:70, spawnRate:45, speed:150, opacity:.85, size:1.7, color:'#ffd166', ...config }); } };
