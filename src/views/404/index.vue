<template>
  <div>
    <van-empty image="error" description="404-您访问的页面不存在">
      <van-button @click="$router.push('/')" round type="danger" class="bottom-button">返回首页</van-button>
    </van-empty>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
.bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
