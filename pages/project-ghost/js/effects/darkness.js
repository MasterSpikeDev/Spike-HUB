export default {
  id: 'darkness',
  create(manager, config = {}) {
    this.manager = manager;
    this.config = { color: 'rgba(0, 0, 0, 1)', opacity: .45, centerOpacity: 0, fadeIn: 700, fadeOut: 700, ...config };
    this.opacity = 0;
    this.targetOpacity = 1;
    this.isStopping = false;
  },
  setConfig(config = {}) {
    this.config = { ...this.config, ...config };
    this.targetOpacity = 1;
    this.isStopping = false;
  },
  stop() {
    this.isStopping = true;
    this.targetOpacity = 0;
  },
  update(delta) {
    const fadeMs = this.targetOpacity > this.opacity ? Number(this.config.fadeIn || 700) : Number(this.config.fadeOut || 700);
    const step = delta * 1000 / Math.max(1, fadeMs);
    this.opacity = this.targetOpacity > this.opacity ? Math.min(1, this.opacity + step) : Math.max(0, this.opacity - step);
    if (this.isStopping && this.opacity <= .001) return true;
    this.draw();
    return false;
  },
  draw() {
    const ctx = this.manager.ctx;
    const w = this.manager.width;
    const h = this.manager.height;
    if (!ctx || !w || !h) return;
    const maxOpacity = Math.max(0, Math.min(1, Number(this.config.opacity ?? .45))) * this.opacity;
    const centerOpacity = Math.max(0, Math.min(1, Number(this.config.centerOpacity ?? 0))) * this.opacity;
    const radius = Math.hypot(w, h) * .54;
    const gradient = ctx.createRadialGradient(w / 2, h / 2, Math.max(1, Math.min(w, h) * .18), w / 2, h / 2, radius);
    gradient.addColorStop(0, this.withAlpha(this.config.color, centerOpacity));
    gradient.addColorStop(.54, this.withAlpha(this.config.color, centerOpacity * .55));
    gradient.addColorStop(1, this.withAlpha(this.config.color, maxOpacity));
    ctx.save();
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  },
  withAlpha(color, alpha) {
    if (typeof color !== 'string') return `rgba(0,0,0, ${alpha})`;
    if (color.startsWith('rgba')) return color.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${alpha})`);
    if (color.startsWith('rgb(')) return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
    const hex = color.trim().replace('#', '');
    if (/^[0-9a-f]{6}$/i.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return color;
  },
  destroy() {}
};
