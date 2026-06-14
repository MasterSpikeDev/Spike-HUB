import EffectManager from './EffectManager.js';
import fire from './fire.js';
import smoke from './smoke.js';
import rain from './rain.js';
import ashes from './ashes.js';
import heartbeat from './heartbeat.js';
import voidParticles from './voidParticles.js';
import snow from './snow.js';
import fog from './fog.js';
import embers from './embers.js';
import sparks from './sparks.js';
import dust from './dust.js';
import leaves from './leaves.js';

function alias(effect, id) {
  return { ...effect, id };
}

export const defaultEffects = [
  fire, alias(fire, 'fogo'),
  smoke, alias(smoke, 'fumaca'), alias(smoke, 'fumaça'),
  rain, alias(rain, 'chuva'),
  ashes, alias(ashes, 'cinzas'),
  heartbeat,
  voidParticles, alias(voidParticles, 'void'), alias(voidParticles, 'particulasVazio'), alias(voidParticles, 'partículasVazio'),
  snow, alias(snow, 'neve'),
  fog, alias(fog, 'neblina'),
  embers, alias(embers, 'brasas'),
  sparks, alias(sparks, 'faiscas'), alias(sparks, 'faíscas'),
  dust, alias(dust, 'poeira'),
  leaves, alias(leaves, 'folhas')
];

export { EffectManager };
