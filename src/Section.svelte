<script>
  export let id;
  export let title;
  export let content;
  export let meta;
</script>

<style>
  section {
    position: relative;
    padding: 40px;
    background-color: #fff;
    margin-bottom: 50px;
    border-radius: 10px;
    box-shadow: 0 2px 18px rgba(200, 200, 200, 0.8);
    color: var(--text-main);
    line-height: 1.76;
    /* border: 3px solid #424242; */
  }

  .title {
    display: inline-block;
    font-weight: bold;
    font-size: 20px;
    color: var(--header);
    background-position: 10px 15px;
    background-repeat: no-repeat;
    background-size: 87% 0.87em;
    background-image: linear-gradient(
      to right,
      var(--highlight) 100%,
      transparent
    );
  }

  :global(a) {
    color: #6b90b4;
  }

  :global(.content > ul li a) {
    margin-bottom: 15px;
  }

  :global(img) {
    max-width: 100%;
  }

  svg {
    left: -15px;
    top: -15px;
    position: absolute;
    width: 40px;
    height: 40px;
  }

  ul {
    display: flex;
    padding-left: 0;
    flex-wrap: wrap;
    list-style: none;
  }

  li {
    width: 33%;
    list-style-position: inside;
    margin-bottom: 10px;
  }

  li::before {
    display: inline-block;
    content: attr(data-num);
    margin-right: 5px;
    width: 1.3em;
    height: 1.3em;
    font-size: 0.8em;
    vertical-align: middle;
    line-height: 1;
    border-radius: 50%;
    text-align: center;
    color: #fff;
    background-color: #6b90b4;
  }

  :global(code) {
    font-size: 90%;
    border-radius: 2px;
    color: #ffffff;
    background-color: #786d70;
    padding: 2px 5px;
    line-height: 1;
  }

  :global(blockquote) {
    padding: 10px;
    padding-left: 20px;
    border-left: 5px solid #efefef;
    color: #aaa;
    margin: 0;
    font-weight: bold;
    margin-bottom: 10px;
  }

  :global(blockquote > p) {
    margin: 0;
  }

  :global(hr) {
    border: 0;
    height: 1px;
    background-color: #eaeaea;
    margin: 4em;
  }

  :global(ul) {
    padding-left: 15px;
  }

  :global(.youtube) {
    width: 100%;
    height: 500px;
  }

  @media (max-width: 680px) {
    li {
      width: 50%;
    }

    section {
      padding: 20px;
    }

    :global(ul) {
      padding-left: 20px;
    }
  }
</style>

<section>
  <svg height="30" width="30">
    <circle fill="#9a8c98" cx="15" cy="15" r="15" />
  </svg>
  <a href="#{id}">
    <h2 {id} class="title">{title}</h2>
  </a>
  <slot>
    <div class="content">
      {@html content}
      <slot name="meta">
        {#if meta}
          <ul>
            {#each meta as m (m.issue_num)}
              <li data-num={m.issue_num}>{m.title}</li>
            {/each}
          </ul>
        {/if}
      </slot>
    </div>
  </slot>
</section>
