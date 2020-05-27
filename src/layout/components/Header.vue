<template>
  <div class="header">
    <div class="title">
      <img src="../../assets/logo/header_logo.png" alt="">
      <span>Terminal Bay Operation System Version:3.5.1</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
    }
  },
}
</script>

<style lang="scss">
  .header {
    .title {
      padding: 0 20px;
      background: #0c2366;
      color: #fff;
      height: 40px;
      font-weight: bold;
      align-items: center;
      display: flex;
      align-items: center;
      img {
        width: 121px;
        height: 17px;
      }
      span {
        font-size:14px;
        font-family:HelveticaNeue-CondensedBold,HelveticaNeue;
        font-weight:normal;
        color:rgba(255,255,255,1);
        margin-left: 18px;
      }
    }
  }
</style>
