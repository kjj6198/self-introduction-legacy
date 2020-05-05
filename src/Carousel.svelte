<script>
  import { onMount } from 'svelte';
  import Card from './Card.svelte';
  import { modal, open } from './stores/modal';
  import { intersection } from './intersection.js';
  export let items;

  let stopped = true;
  let selected = '';

  let translateX = 0;
  function handleCardClick(item) {
    open(item.title, item);
  }

  onMount(() => {});
</script>

<style>
  .carousel {
    padding: 0 8px;
    position: relative;
    width: 100%;
    overflow-x: hidden;
  }

  .carousel::before,
  .carousel::after {
    position: absolute;
    top: 0;
    bottom: 0;
    content: '';
    width: 1px;
    box-shadow: 0 0 10px rgba(100, 100, 100, 0.8);
  }

  .carousel::before {
    left: 0;
  }

  .carousel::after {
    right: 0;
  }

  @keyframes carousel {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-1855px);
    }
  }

  .wrapper {
    width: auto;
    white-space: nowrap;
    will-change: transform;
    display: flex;
    animation: carousel 20s linear infinite;
  }

  .stopped {
    animation-play-state: paused;
  }
</style>

<div
  use:intersection={{ handleIntersect: (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        stopped = false;
      } else {
        stopped = true;
      }
    } }}
  class="carousel"
  on:mouseenter={() => (stopped = true)}
  on:mouseleave={() => (stopped = false)}
  on:click={() => (selected = true)}>
  <div class="wrapper" class:stopped>
    <slot>
      {#each items as item (item.title)}
        <Card
          on:cardClick={() => handleCardClick(item)}
          title={item.title}
          description={item.content}
          type={item.type}
          anchor={item.anchor}
          image={item.cover} />
      {/each}
      {#each items as item (item.title)}
        <Card
          on:cardClick={() => handleCardClick(item)}
          id={item.id}
          title={item.title}
          description={item.content}
          type={item.type}
          anchor={item.anchor}
          image={item.cover} />
      {/each}
    </slot>
  </div>

</div>
