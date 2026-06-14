const TAU = Math.PI * 2;

export function clamp(value, min, max) {
  return Math.min(Math.max(Number(value) || 0, min), max);
}

export function lerp(from, to, progress) {
  return from + (to - from) * progress;
}

export function pick(value, fallback) {
  return value === undefined || value === null ? fallback : value;
}

export function parseColor(color, fallback = '#ffffff') {
  const selected = String(color || fallback).trim();
  const rgbMatch = selected.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbMatch) return rgbMatch[1].split(',').slice(0, 3).join(',');
  const hex = selected.replace('#', '');
  const normalized = hex.length === 3
    ? hex.split('').map((item) => item + item).join('')
    : hex.padEnd(6, 'f').slice(0, 6);
  const value = Number.parseInt(normalized, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function randomBetween(range, fallbackMin, fallbackMax = fallbackMin) {
  if (Array.isArray(range)) return lerp(Number(range[0]) || 0, Number(range[1]) || 0, Math.random());
  const value = Number(range);
  if (Number.isFinite(value)) return value;
  return lerp(fallbackMin, fallbackMax, Math.random());
}

export function createParticleEffect(manager, config, defaults) {
  const particles = [];
  let spawnAccumulator = 0;
  let width = manager.width;
  let height = manager.height;
  let destroyed = false;

  const settings = {
    ...defaults,
    ...config,
    intensity: clamp(pick(config.intensity, defaults.intensity ?? 1), 0, 4)
  };

  function getMaxParticles() {
    return Math.max(0, Math.floor((settings.quantity ?? 80) * Math.max(settings.intensity, 0.05)));
  }

  function resetParticle(particle, initial = false) {
    const spawn = settings.spawn || 'full';
    if (spawn === 'top') {
      particle.x = Math.random() * width;
      particle.y = initial ? Math.random() * height : -randomBetween(settings.size, 4, 12);
    } else if (spawn === 'bottom') {
      particle.x = Math.random() * width;
      particle.y = initial ? Math.random() * height : height + randomBetween(settings.size, 4, 12);
    } else if (spawn === 'edges') {
      const side = Math.floor(Math.random() * 4);
      particle.x = side === 1 ? width : side === 3 ? 0 : Math.random() * width;
      particle.y = side === 2 ? height : side === 0 ? 0 : Math.random() * height;
    } else {
      particle.x = Math.random() * width;
      particle.y = Math.random() * height;
    }

    particle.vx = randomBetween(settings.vx, -8, 8);
    particle.vy = randomBetween(settings.vy, -12, 12);
    particle.size = randomBetween(settings.size, 2, 8);
    particle.life = randomBetween(settings.life, 2, 5);
    particle.age = initial ? Math.random() * particle.life : 0;
    particle.opacity = randomBetween(settings.opacity, 0.2, 0.8);
    particle.rotation = Math.random() * TAU;
    particle.spin = randomBetween(settings.spin, -0.4, 0.4);
    particle.wobble = randomBetween(settings.wobble, 0, 1);
  }

  function ensureParticleCount() {
    const max = getMaxParticles();
    while (particles.length < max) {
      const particle = {};
      resetParticle(particle, true);
      particles.push(particle);
    }
    if (particles.length > max) particles.length = max;
  }

  function resize(nextWidth, nextHeight) {
    width = nextWidth;
    height = nextHeight;
  }

  function update(delta) {
    if (destroyed || settings.intensity <= 0) return;
    ensureParticleCount();
    const spawnRate = Math.max(0, (settings.spawnRate ?? getMaxParticles() * 0.35) * settings.intensity);
    spawnAccumulator += spawnRate * delta;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      if (spawnAccumulator >= 1 && particle.age > particle.life * 0.72) {
        resetParticle(particle);
        spawnAccumulator -= 1;
      }

      particle.age += delta;
      particle.x += particle.vx * delta;
      particle.y += particle.vy * delta;
      particle.rotation += particle.spin * delta;
      if (settings.wind) particle.x += Math.sin((particle.age + particle.wobble) * 1.7) * settings.wind * delta;

      const margin = Math.max(80, particle.size * 8);
      const out = particle.x < -margin || particle.x > width + margin || particle.y < -margin || particle.y > height + margin;
      if (particle.age >= particle.life || out) resetParticle(particle);
    }
  }

  function configure(nextConfig = {}) {
    Object.assign(settings, nextConfig);
    settings.intensity = clamp(pick(settings.intensity, defaults.intensity ?? 1), 0, 4);
    ensureParticleCount();
  }

  function render(ctx, opacity = 1) {
    if (destroyed || opacity <= 0 || particles.length === 0) return;
    const color = parseColor(settings.color, defaults.color);
    ctx.save();
    ctx.globalCompositeOperation = settings.blend || 'source-over';
    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const progress = clamp(particle.age / Math.max(particle.life, 0.001), 0, 1);
      const fade = settings.fade === 'inout' ? Math.sin(progress * Math.PI) : 1 - progress;
      const alpha = clamp(particle.opacity * fade * opacity, 0, 1);
      if (alpha <= 0.01) continue;
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      ctx.globalAlpha = alpha;
      if (settings.shape === 'line') {
        ctx.strokeStyle = `rgba(${color}, ${alpha})`;
        ctx.lineWidth = Math.max(1, particle.size * (settings.lineWidthScale ?? 0.22));
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo((settings.lineX ?? particle.vx * 0.08), (settings.lineY ?? particle.vy * 0.08));
        ctx.stroke();
      } else if (settings.shape === 'leaf') {
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, particle.size * 0.55, particle.size, 0, 0, TAU);
        ctx.fill();
      } else {
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
        gradient.addColorStop(0, `rgba(${color}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, particle.size, 0, TAU);
        ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();
  }

  ensureParticleCount();

  return {
    id: settings.id,
    resize,
    configure,
    update,
    render,
    destroy() {
      destroyed = true;
      particles.length = 0;
    }
  };
}
