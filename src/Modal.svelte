<script>
  import { fade } from 'svelte/transition';
  import { c } from './crossfade';
  import { close } from './stores/modal';
  export let id;
  let node;

  const [send, receive] = c;
  function handleClose(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }
</script>

<style>
  .modal-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 101;
  }

  .modal {
    padding: 30px;
    margin: 40px auto;
    width: 860px;
    max-width: 90%;
    max-height: calc(100vh - 80px);
    background-color: #fff;
    border-radius: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .close {
    padding: 10px;
    width: 52px;
    height: 52px;
    font-size: 30px;
    line-height: 1;
    border: 0;
    appearance: none;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid currentColor;
  }

  @media (hover: hover) {
    .close:hover {
      background-color: rgba(125, 125, 125, 0.2);
    }

    .modal {
      padding: 15px;
    }
  }
</style>

<div
  class="modal-wrapper"
  role="dialog"
  on:click={handleClose}
  aria-labelledby="modal-title-{id}"
  aria-modal="true">
  <div
    bind:this={node}
    out:send={{ key: id }}
    in:receive={{ key: id }}
    class="modal"
    role="document">
    <button type="button" class="close" on:click={close} aria-label="Close">
      <span aria-hidden="true">×</span>
    </button>
    <slot />
  </div>
</div>
