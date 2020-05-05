<script>
  import { createEventDispatcher } from 'svelte';
  import { c } from './crossfade';
  export let image;
  export let title;
  export let description;
  export let anchor;
  export let type;
  const dispatch = createEventDispatcher();

  const [send, receive] = c;

  function handleClick(e) {
    send(e.target, {
      key: title
    });
    dispatch('cardClick', {
      title
    });
  }
</script>

<style>
  .card {
    flex-basis: 250px;
    flex-shrink: 0;
    display: flex;
    width: 25%;
    height: 400px;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-right: 15px;
    overflow: hidden;
    border: 1px solid #eaeaea;
    border-radius: 7px;
    white-space: normal;
    background-color: #fff;
  }

  .btn {
    display: inline-block;
    border: 0;
    appearance: none;
    padding: 8px;
    line-height: 1;
    border-radius: 3px;
    background-color: #6b90b4;
    box-shadow: 0 2px 0 #425c75;
    color: #fff;
    cursor: pointer;
  }

  .image {
    width: 100%;
    height: 150px;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .content {
    padding: 10px;
    padding-bottom: 0;
  }

  .footer {
    text-align: center;
  }
</style>

<div class="card" in:receive={{ key: title }}>
  <div
    class="image"
    role="img"
    style={`background-image: url(${image});`}
    aria-label={title} />
  <div class="content">
    <h4 id={title}>{title}</h4>
    <p>
      {@html description}
    </p>
  </div>
  <div class="footer">
    {#if type === 'anchor'}
      <a href="#{anchor}" class="btn">想看更多！</a>
    {:else if type !== 'normal'}
      <button class="btn" on:click={handleClick}>想看更多！</button>
    {/if}
  </div>

</div>
