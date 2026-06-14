import ashes from './ashes.js';
export default { ...ashes, id:'leaves', create(manager, config={}){ ashes.create.call(this, manager, { quantity:55, spawnRate:12, speed:45, opacity:.62, size:5, wind:45, color:'rgba(126,82,35,.85)', ...config }); } };
