<script>
  import { setContext } from 'svelte';
  import Head from './Head.svelte';
  import Hero from './Hero.svelte';
  import Section from './Section.svelte';
  export let name;
  export let config;

  setContext('config', config);
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
</style>

<Head meta={config.meta} />

<Hero
  links={config.meta.links}
  name={config.meta.name}
  tag={config.meta.tag}
  brief={config.meta.brief}
  avatar={config.meta.avatar} />

<main>
  <div class="container">
    {#each Object.values(config.content) as c (c.id)}
      <Section id={c.id} title={c.title} content={c.content} />
    {/each}
  </div>
</main>
