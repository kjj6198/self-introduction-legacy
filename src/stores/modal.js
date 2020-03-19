const { writable } = require('svelte/store');

const modal = writable({
  isOpen: false,
  name: null,
  params: {},
});

const close = () =>
  modal.update((m) => ({
    name: null,
    params: {},
    isOpen: false,
  }));

const open = (name, params) =>
  modal.update((m) => ({
    name,
    params,
    isOpen: true,
  }));

module.exports = { modal, close, open };
