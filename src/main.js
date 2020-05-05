import App from './App.svelte';
import SmoothScroll from 'smooth-scroll';

const app = new App({
  target: document.querySelector('#app'),
  hydrate: true,
  props: {
    config: window.__DATA__,
  },
});

const scroll = new SmoothScroll('a[href*="#"]', {
  easing: 'easeInCubic',
  speed: 500,
  speedAsDuration: true,
});

export default app;
