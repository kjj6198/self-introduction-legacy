<script>
  import { c } from './faq';
  let status = 'idle';
  let name = '';
  let question = '';
  let req;
  const [send] = c;

  const handleSubmit = (e) => {
    if (status === 'loading') {
      return;
    }

    e.preventDefault();
    if (question.length > 500) {
      alert('不可以超過 500 字！');
      return;
    } else if (question.trim().length === 0) {
      alert('不可以為空白！');
      return;
    }

    status = 'loading';

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
      .then((doc) => send(e.target, { key: doc._id }))
      .then(() => {
        name = '';
        question = '';
      })
      .then(() => (status = 'loaded'));
  };
</script>

<style>
  form {
    font-size: 16px;
  }

  input,
  textarea {
    padding: 10px;
    line-height: 1;
    border: 1px solid var(--header);
    outline: none;
  }

  textarea {
    line-height: 1.67;
  }

  input:focus,
  textarea:focus {
    outline: 1px solid var(--header);
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  label > span {
    display: inline-block;
    margin-right: 3px;
  }
  label > input,
  label > textarea {
    flex: 1;
  }

  input:disabled,
  textarea:disabled,
  textarea[disabled],
  input[disabled] {
    opacity: 0.65;
  }

  @media (max-width: 680px) {
    label {
      flex-direction: column;
    }

    label > span,
    label > input,
    label > textarea {
      width: 100%;
    }

    .notice {
      font-size: 14px;
    }
  }

  .btn-wrapper {
    text-align: center;
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

  .alert {
  }
</style>

<form name="faq-form" on:submit={handleSubmit}>
  <h2>Q & A</h2>
  <p class="notice">
    這是一個互動式的自我介紹，如果看完後有什麼問題或是建議都可以在這個表單詢問。
    <br />
    別人也可以看到提問的問題，如果有回覆的話在右下角會出現已回覆的標記，點擊後就可以看到回覆內容。
    <br />
    為了確保問題品質，如果出現惡意攻擊會在後台刪除，非相關的問題或連結也會被刪除。目前能夠看到的留言筆數是
    50 筆，會根據留言狀況做調整，也有可能暫時停用發問功能。
  </p>
  <label for="name" aria-labelledby="name-label">
    <span id="name-label">你的名字（可匿名）</span>
    <input
      id="name"
      name="name"
      bind:value={name}
      disabled={status === 'loading'} />
  </label>
  <label for="question" aria-labelledby="question-label">
    <span id="question-label">你的問題（最多 500 字）</span>
    <textarea
      rows="10"
      id="question"
      name="question"
      bind:value={question}
      disabled={status === 'loading'} />
  </label>
  <div class="btn-wrapper">
    <button disabled={status === 'loading'} class="btn" type="submit">
      確認送出！
    </button>
  </div>

  <div class="alert" role="alert" aria-live="assertive" aria-atomic="true">
    {#if req}
      {#await req}
        loading
      {:then data}
        <p>Yes! 成功了！我會盡快回覆！</p>
      {:catch error}
        <p>咦？好像失敗了，等一下再試試看吧！{error.message}</p>
      {/await}
    {/if}
  </div>

</form>
