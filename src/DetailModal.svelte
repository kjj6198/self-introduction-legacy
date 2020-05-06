<script>
  import { modal } from './stores/modal';
</script>

<style>
  img {
    width: 30px;
    height: 30px;
  }

  .user {
    vertical-align: middle;
  }

  .container {
    margin-top: 15px;
  }
</style>

<div class="container">
  <h4 class="user">
    <img src="/user.png" alt="user image" />
    {$modal.params.name || '匿名'}
  </h4>
  <p>{$modal.params.question}</p>
  <div class="reply">
    <h4>回覆：</h4>
    <p>
      {@html $modal.params.reply}
    </p>
  </div>

</div>
