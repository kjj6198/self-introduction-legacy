<script>
  export let id;
  export let title;
  export let content;
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
  :global(.content > ul li) {
    margin-bottom: 15px;
  }

  svg {
    left: -15px;
    top: -15px;
    position: absolute;
    width: 40px;
    height: 40px;
  }
</style>

<section>
  <svg height="30" width="30">
    <circle fill="#9a8c98" cx="15" cy="15" r="15" />
  </svg>
  <a href="#{id}">
    <h2 {id} class="title">{title}</h2>
  </a>
  <div class="content">
    {@html content}
  </div>
</section>
