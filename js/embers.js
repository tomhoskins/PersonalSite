(function () {
  'use strict';

  const canvas = document.getElementById('ember-canvas');
  const ctx = canvas.getContext('2d');

  const EMBER_COLORS = ['#FF6B35', '#FF8C42', '#FFA500', '#FFD700', '#FF4500', '#FF7043'];
  const isMobile = () => window.innerWidth < 640;

  function particleCount() {
    return isMobile() ? 25 : 60;
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Ember {
    constructor(forceBottom = false) {
      this.reset(forceBottom);
    }

    reset(forceBottom = false) {
      const w = canvas.width;
      const h = canvas.height;
      this.x    = Math.random() * w;
      this.y    = forceBottom ? h + Math.random() * 60 : Math.random() * h;
      this.size = 0.8 + Math.random() * 2.2;
      this.vx   = (Math.random() - 0.5) * 0.6;
      this.vy   = -(0.5 + Math.random() * 1.4);
      this.life = 0;
      this.maxLife = 120 + Math.random() * 160;
      this.color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
      this.sway  = Math.random() * Math.PI * 2;
      this.swaySpeed = 0.02 + Math.random() * 0.03;
      this.swayAmp   = 0.3 + Math.random() * 0.5;
    }

    update() {
      this.life++;
      this.sway += this.swaySpeed;
      this.x += this.vx + Math.sin(this.sway) * this.swayAmp;
      this.y += this.vy;

      if (this.y < -20 || this.life > this.maxLife) {
        this.reset(true);
      }
    }

    opacity() {
      const t = this.life / this.maxLife;
      // Bell-curve: rise to 0.8 then fade
      if (t < 0.15) return (t / 0.15) * 0.8;
      if (t > 0.7)  return ((1 - t) / 0.3) * 0.8;
      return 0.8;
    }

    draw() {
      const op = this.opacity();
      if (op <= 0) return;

      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      grad.addColorStop(0, this.color + Math.round(op * 255).toString(16).padStart(2, '0'));
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  let particles = [];

  function init() {
    resize();
    particles = [];
    const count = particleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Ember(false));
    }
  }

  let rafId;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const p of particles) {
      p.update();
      p.draw();
    }

    // Maintain particle count on resize
    const target = particleCount();
    while (particles.length < target) particles.push(new Ember(true));
    while (particles.length > target) particles.pop();

    rafId = requestAnimationFrame(loop);
  }

  // ── Scroll → CSS variable for parallax ──
  function onScroll() {
    document.documentElement.style.setProperty('--scroll-y', window.scrollY + 'px');
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── ResizeObserver ──
  const ro = new ResizeObserver(() => {
    resize();
  });
  ro.observe(document.body);

  // ── Reduced motion: skip animation ──
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    // Don't run particle loop
    return;
  }

  init();
  loop();
}());
