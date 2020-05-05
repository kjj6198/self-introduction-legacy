<script>
  import { crossfade, scale, fade } from 'svelte/transition';
  export let meta;
</script>

<style>
  .content {
    margin-bottom: 20px;
  }
  .wrapper {
    text-align: center;
  }

  .content > :global(h3) {
    display: inline-block;
    font-weight: bold;
    font-size: 18px;
    color: var(--header);
    background-position: 10px 15px;
    background-repeat: no-repeat;
    background-size: 87% 0.87em;
    background-image: linear-gradient(to right, var(--tag) 100%, transparent);
    margin-bottom: 5px;
  }
</style>

<div class="wrapper">
  <h2 class="title">{meta.title}</h2>
</div>

<div class="content">
  {@html meta.detail.content}
</div>
