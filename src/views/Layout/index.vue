<template>
  <div>
    <RouterView></RouterView>
    <van-tabbar route>
      <van-tabbar-item replace icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item replace icon="chat-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item replace icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item replace icon="user-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style></style>
