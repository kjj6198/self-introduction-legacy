<script>
  import { onMount } from 'svelte';
  import { open } from './stores/modal';
  let faq;
  onMount(() => {
    faq = fetch('/api/qna').then((res) => res.json());
  });
</script>

<style>
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header img {
    width: 30px;
    height: 30px;
  }

  .container {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
  }

  .comment {
    border-radius: 4px;
    padding: 15px;
    box-shadow: 0 2px 2px 0 rgba(100, 100, 100, 0.14),
      0 3px 1px -2px rgba(100, 100, 100, 0.12),
      0 1px 5px 0 rgba(100, 100, 100, 0.2);
  }

  button {
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

  .btn-wrapper {
    margin-bottom: 10px;
  }
</style>

<div>
  {#await faq}
    loading
  {:then data}
    <div class="btn-wrapper">
      <button type="button" on:click={() => open('faq', {})}>
        我也要發問！
      </button>
    </div>
    <div class="container">
      {#each data as d (d._id)}
        <div class="comment">
          <div class="header">
            <img src="/user.png" alt="user image" />
            <h3>{d.name || '匿名'}</h3>
            <time datetime={d.createdAt}>
              {new Date(d.createdAt).toLocaleDateString()}
            </time>
          </div>
          <p>{d.question}</p>
          <p>{d.reply}</p>
        </div>
      {/each}
    </div>
  {:catch error}
    <div>
      <p>系統忙碌中...</p>
    </div>
  {/await}
</div>
