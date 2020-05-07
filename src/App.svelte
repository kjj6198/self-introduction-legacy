<script>
  import { setContext, onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { modal, close } from './stores/modal';
  import Head from './Head.svelte';
  import Hero from './Hero.svelte';
  import Section from './Section.svelte';
  import Carousel from './Carousel.svelte';
  import Modal from './Modal.svelte';
  import TravelModal from './TravelModal.svelte';
  import MusicModal from './MusicModal.svelte';
  import FAQModal from './FAQModal.svelte';
  import DetailModal from './DetailModal.svelte';
  import Transition from './Transition.svelte';
  import FAQ from './FAQ.svelte';

  export let config;

  let x = 0;
  let y = 0;

  setContext('config', config);
  let running = false;
  onMount(() => {
    modal.subscribe((v) => {
      if (v.isOpen) {
        document.body.classList.add('overlay');
      } else {
        document.body.classList.remove('overlay');
      }

      return () => document.body.classList.remove('overlay');
    });
  });
</script>

<style>
  :root {
    --top-background: #2a2a2a;
    --background: #f3e9e4;
    --header: #4b4b4b;
    --text: #4b4b4b;
    --text-main: #3c3c46;
    --main: #f3e9e4;
    --sub: #9a8c98;
    --highlight: #c9ada7;
    --border: #edd6d1;
    --tag: #8dbfef;
  }

  :global(.overlay) {
    overflow: hidden;
    height: 100%;
  }

  main {
    background-color: var(--background);
    padding: 20px;
  }

  .container {
    width: 95%;
    max-width: 1080px;
    margin: auto;
  }

  @media (max-width: 680px) {
    .container {
      width: 98%;
    }

    html,
    body {
      font-size: 14px;
    }

    main {
      padding: 13px;
    }
  }

  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 100;
    opacity: 0.5;
    background-color: #aaa;
  }
</style>

<svelte:body
  class:overlay={$modal.isOpen}
  on:keydown={(e) => {
    if (e.keyCode === 27) {
      close();
    }
  }}
  on:click={(e) => {
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
      x = e.clientX;
      y = e.clientY;
      running = true;
    }
  }} />

<Head meta={config.meta} />

<Hero
  ids={Object.keys(config.content).map((k) => ({
    id: config.content[k].id,
    title: config.content[k].title
  }))}
  links={config.meta.links}
  name={config.meta.name}
  tag={config.meta.tag}
  brief={config.meta.brief}
  avatar={config.meta.cover} />

<main>
  <div class="container">
    {#each Object.values(config.content).filter((c) => !!c.id) as c (c.id)}
      {#if c.id === 'favorite'}
        <Section id={c.id} title={c.title}>
          <Carousel
            items={Object.keys(config.favorite).map((key) => config.favorite[key])} />
        </Section>
      {:else}
        <Section id={c.id} title={c.title} content={c.content} meta={c.meta} />
      {/if}
    {/each}

    <Section id="qna" title="來問問題">
      <FAQ />
    </Section>
  </div>

</main>

<Hero
  ids={Object.keys(config.content).map((k) => ({
    id: config.content[k].id,
    title: config.content[k].title
  }))}
  links={config.meta.links}
  name={config.meta.name}
  tag={config.meta.tag}
  brief={config.meta.brief}
  avatar={config.meta.cover} />

<Transition {x} {y} {running} on:complete={() => (running = false)} />

{#if $modal.isOpen}
  <Modal id={$modal.name}>
    {#if $modal.name === '旅行' || $modal.name === '料理'}
      <TravelModal meta={$modal.params} />
    {:else if $modal.name === '音樂' || $modal.name === '遊戲' || $modal.name === '推理小說（日本為主）'}
      <MusicModal meta={$modal.params} />
    {:else if $modal.name === 'faq'}
      <FAQModal />
    {:else if $modal.name === 'detail'}
      <DetailModal />
    {/if}
  </Modal>
  <div class="overlay" transition:fade on:click={close} />
{/if}
