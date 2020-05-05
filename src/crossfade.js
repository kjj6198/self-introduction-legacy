const { crossfade, scale } = require('svelte/transition');

module.exports = {
  c: crossfade({
    duration: 250,
    fallback: scale,
  }),
};
