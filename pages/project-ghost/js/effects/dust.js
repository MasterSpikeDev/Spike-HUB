import ashes from './ashes.js';
export default { ...ashes, id:'dust', create(manager, config={}){ ashes.create.call(this, manager, { quantity:70, spawnRate:10, speed:18, opacity:.25, size:1.8, wind:8, color:'rgba(215,200,170,.55)', ...config }); } };
