<script>
  import { crossfade, scale, fade } from 'svelte/transition';
  export let meta;
  let selected = '';

  const [send, receive] = crossfade({
    fallback: () => '',
    duration: 350
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-gap: 20px;
  }

  .overview {
    width: 100%;
    height: 200px;
    background-color: transparent;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 4px;
    cursor: pointer;
  }

  .detail {
    display: flex;
    align-items: center;
    position: fixed;
    background-color: #000;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .detail > img {
    display: block;
    max-width: auto;
    margin: auto;
    height: 80%;
  }

  .title {
    font-size: 30px;
    text-align: center;
  }

  figcaption {
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

  .content {
    margin-bottom: 20px;
  }

  @media (max-width: 680px) {
    .container {
      display: block;
      margin-bottom: 20px;
    }

    .detail > img {
      max-width: 100%;
      height: initial;
    }
  }
</style>

<h2 class="title">{meta.title}</h2>
<div class="content">
  {@html meta.content}
</div>
<div class="container">
  {#each meta.meta.images as image (image.src)}
    {#if selected !== image.src}
      <figure>
        <figcaption>{image.title}</figcaption>
        <div
          on:click={() => (selected = image.src)}
          role="img"
          class="overview"
          aria-label={image.title}
          in:receive={{ key: selected }}
          out:send={{ key: image.src }}
          style={`background-image: url(${image.src});`} />
      </figure>
    {/if}
  {/each}
  {#if selected}
    <div
      class="detail"
      transition:fade={{ duration: 150 }}
      on:click={() => (selected = null)}>
      <img
        on:click={() => (selected = null)}
        in:receive={{ key: selected }}
        out:send={{ key: selected }}
        src={selected}
        alt="iamge" />
    </div>
  {/if}
</div>
