<template>
  <div id="app">
    <!-- 按需缓存 -->
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive" />
  </div>
</template>
<script>
export default {}
</script>

<style lang="less"></style>
