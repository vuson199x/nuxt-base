<template>
  <div class="login-container">
    <h1>Nuxt Base</h1>
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .login-container {
    background: #fff;
    border: 1px solid #c0c4cc;
    border-radius: 10px;
    padding: 20px 20px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .login-container h1, .login-container h2 {
      text-align: center;
  }

  .login-container button {
    display: block;
    margin: 15px auto 0px;
  }

</style>