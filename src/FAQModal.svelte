<script>
  import { c } from './faq';

  let status = 'idle';
  let name = '';
  let question = '';
  let req;
  const [send] = c;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.length > 500) {
      alert('不可以超過 500 字！');
      return;
    } else if (question.trim().length === 0) {
      alert('不可以為空白！');
      return;
    }

    req = fetch('/api/qna', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        name
      })
    })
      .then((res) => res.json())
      .then((doc) => send(e.target, { key: doc._id }));
  };
</script>

<style>
  form {
    font-size: 16px;
  }
</style>

<form name="faq-form" on:submit={handleSubmit}>
  <label for="name" aria-labelledby="name-label">
    <span id="name-label">你的名字：</span>
    <input id="name" name="name" bind:value={name} />
  </label>
  <label for="question" aria-labelledby="question-label">
    <span id="question-label">你的問題：（最多 500 字）</span>
    <input id="question" name="question" bind:value={question} />
  </label>
  <button type="submit">確認送出！</button>

  <div role="alert" aria-live="assertive" aria-atomic="true">
    {#if req}
      {#await req}
        loading
      {:then data}
        <p>Yes! 成功了！我會盡快回覆！</p>
      {:catch error}
        <p>咦？好像失敗了，等一下再試試看吧！</p>
      {/await}
    {/if}
  </div>

</form>
