<script>
  import { onMount, afterUpdate, createEventDispatcher } from 'svelte';
  import { Star } from './Star';

  const dispatch = createEventDispatcher();

  export let running = false;
  export let x = 0;
  export let y = 0;

  let canvas;

  $: ctx = canvas ? canvas.getContext('2d') : null;

  function drawStars(num, x, y, radius) {
    const stars = [];
    for (var i = 0; i < num; i++) {
      const star = new Star(ctx, x, y, {
        innerRadius: 3,
        outerRadius: 10
      });
      stars.push(star);
      star.draw();
    }

    return stars;
  }

  class CircleRipple {
    constructor(x, y, w, h, options) {
      this.x = x;
      this.y = y;
      this.radius = Math.sqrt(w ** 2 + h ** 2);
      this.speed = options.speed || this.DEFAULT_SPEED;
      this.color = options.color;
      this.onComplete = options.onComplete || function() {};

      this.startRadius = 0;
      this.done = false;
      this.reversed = false;
    }

    get DEFAULT_SPEED() {
      // eslint-disable-line
      return 40;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.startRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    reset() {
      ctx.globalCompositeOperation = 'source-over';
      this.done = false;
      this.startRadius = 0;
      this.reversed = false;
    }

    update() {
      ctx.fillStyle = this.color;
      this.startRadius += this.speed;

      if (this.startRadius <= this.radius) {
        this.draw();
      } else if (!this.reversed && !this.done) {
        this.reversed = true;
        ctx.globalCompositeOperation = 'destination-out';
        this.startRadius = 0;
      } else {
        this.done = true;

        this.onComplete(this);
        ctx.globalCompositeOperation = 'source-over';
      }
    }
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let stars;
  let circleRipple;
  afterUpdate(() => {
    if (running) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars = drawStars(20, x, y, 5);
      circleRipple = new CircleRipple(x, y, canvas.width, canvas.height, {
        speed: 60,
        color: '#6b90b4',
        onComplete: () => dispatch('complete')
      });

      function update() {
        circleRipple.update();
        stars.forEach((star) => star.update());
        if (!circleRipple.done) {
          requestAnimationFrame(update);
        }
      }

      if (running) {
        const request = requestAnimationFrame(update);
        if (circleRipple.done) {
          cancelAnimationFrame(request);
          circleRipple.done = false;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  });
</script>

<style>
  .running {
    display: block;
  }

  canvas {
    display: none;
    position: fixed;
    z-index: 10000;
    top: 0;
    width: 100%;
    height: 100%;
    right: 0;
  }
</style>

<svelte:window
  on:resize={(e) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }} />

<canvas bind:this={canvas} class:running />
