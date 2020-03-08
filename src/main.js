import App from './App.svelte';

const app = new App({
  target: document.querySelector('#app'),
  hydrate: true,
  props: {
    config: window.__DATA__,
  },
});

export default app;
