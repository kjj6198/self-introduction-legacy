class Star {
  constructor(ctx, cx, cy, options) {
    this.ctx = ctx;
    this.cx = cx;
    this.cy = cy;
    this.expandRadius = Math.PI * 2 * Math.random();
    this.speedX = 6 * Math.cos(this.expandRadius);
    this.speedY = 6 * Math.sin(this.expandRadius);
    this.spikes = 5;
    this.innerRadius = options.innerRadius;
    this.outerRadius = options.outerRadius;
    this.fill = options.fill || '#fff';
    this.storke = options.stroke || '#fff';
    this.storkeWidth = options.strokeWidth;

    return this;
  }

  get DEFAULT_RADIUS() {
    return 5;
  }

  update() {
    this.ctx.save();
    this.speedX *= 0.95;
    this.speedY *= 0.95;

    this.cx += this.speedX;
    this.cy += this.speedY;
    this.draw();
    this.ctx.restore();
  }

  draw() {
    const { ctx, cx, cy, innerRadius, outerRadius, spikes } = this;
    let rotation = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    let x = cx;
    let y = cy;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i += 1) {
      x = cx + Math.cos(rotation) * outerRadius;
      y = cy + Math.sin(rotation) * outerRadius;
      ctx.lineTo(x, y);
      rotation += step;

      x = cx + Math.cos(rotation) * innerRadius;
      y = cy + Math.sin(rotation) * innerRadius;

      ctx.lineTo(x, y);
      rotation += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.strokeWidth = 2;
    ctx.strokeStyle = this.storke;
    ctx.fillStyle = this.fill;
    ctx.stroke();
    ctx.fill();
  }
}

Star.randomRadius = (range) => Math.random() * range + 1;

module.exports = { Star };
