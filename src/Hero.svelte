<script>
  import { onMount } from 'svelte';
  import { linear } from 'svelte/easing';
  import { intersection } from './intersection';
  export let name;
  export let tag;
  export let brief;
  export let avatar;
  export let links;
  export let ids;

  let canvas;
  let angle = 0;
  let raf;
  let timer;
  $: x = 80 * Math.cos(Math.PI * 2 * angle);
  $: y = 80 * Math.sin(Math.PI * 2 * angle);

  function stop() {
    clearInterval(timer);
    cancelAnimationFrame(raf);
  }

  function animate(draw) {
    const startTime = window.performance.now();
    function move(currentTime = startTime) {
      const tFraction = Math.min(1, (currentTime - startTime) / 5000);
      const p = linear(tFraction);

      draw(p);
      if (p <= 1) {
        raf = requestAnimationFrame(move);
      } else {
        angle = 0;
      }
    }

    move();
  }

  onMount(() => {
    timer = setInterval(() => {
      animate((p) => {
        angle = p;
      });
    }, 5000);

    animate((p) => {
      angle = p;
    });
  });
</script>

<style>
  .taiwan {
    display: inline-block;
    position: absolute;
    top: 30%;
    left: 45%;
    width: 40px;
    height: 40px;
    background-color: transparent;
    will-change: transform;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('/taiwan.png');
  }

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    width: 100%;
    height: 100vh;
    color: #fff;
    background-color: var(--top-background);
  }

  .avatar {
    display: block;
    margin: auto;
    max-width: 100%;
    width: 120px;
    height: 120px;
  }

  section {
    text-align: center;
  }

  .avatar-wrapper {
    position: relative;
    display: inline-block;
    border: 3px solid #fff;
    border-radius: 50%;
    margin-bottom: 30px;
  }

  h2 {
    font-size: 30px;
    font-family: 'jf-openhuninn-1.0';
    margin-bottom: 20px;
  }

  p {
    margin-top: 20px;
    font-size: 20px;
  }

  .social {
    width: 30px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .social-link-wrapper {
    text-decoration: none;
  }

  .table-of-content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-left: 0;
    list-style-type: none;
  }

  .table-of-content > li {
    width: 25%;
    margin-bottom: 10px;
  }
  .table-of-content a {
    display: inline-block;
    background-color: #c9ada7;
    color: #efefef;
    padding: 3px 5px;
    border-radius: 3px;
  }

  .links {
    margin-bottom: 20px;
  }

  @media (max-width: 680px) {
    .table-of-content > li {
      width: 50%;
      margin-bottom: 10px;
    }
  }
</style>

<header>
  <section>
    <div class="avatar-wrapper">
      <img
        use:intersection={{ handleIntersect: (entries) => {
            if (entries.every((e) => !e.isIntersecting)) {
              stop();
            }
          } }}
        src={avatar}
        class="avatar"
        alt="{name} avatar"
        on:mouseenter={stop} />
      <div
        role="button"
        class="taiwan"
        style={`transform: translate(${x}px, ${y}px);`}
        on:mouseenter={stop} />
    </div>
    <h2>{name}</h2>
    <h3>{tag}</h3>
    <p>{brief}</p>
    <div class="links">
      {#each Object.entries(links) as link}
        {#if ['twitter', 'github', 'medium'].includes(link[0])}
          <a href={link[1]} class="social-link-wrapper">
            <img class="social" src="{link[0]}.png" alt={link[0]} />
          </a>
        {:else}
          <a href={link[1]} class="social-link-wrapper">
            <img class="social" src="blog.png" alt={link[0]} />
          </a>
        {/if}
      {/each}
    </div>
    <div>
      <ul class="table-of-content">
        {#each ids as { id, title } (id)}
          <li>
            <a href="#{id}">{title}</a>
          </li>
        {/each}
      </ul>
    </div>
  </section>
</header>
