<template>
  <div class="home">
    <van-nav-bar fixed>
      <template #left><div class="logo"></div></template>
      <template #right>
        <van-button
          round
          hairline
          icon="search"
          type="info"
          size="small"
          class="search-btn"
          @click="$router.push('/search')"
        >
          搜索
        </van-button>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannelList } from '@/api/channel'
import ArticleList from './ArticleList.vue'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channelList: []
    }
  },
  async created () {
    const res = await getChannelList()
    this.channelList = res.data.channels
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  padding-top: 46px;
  padding-bottom: 50px;
  overflow: hidden;
  // 控制滚动条范围
  .van-tabs {
    height: 100%;
    padding-top: 50px;
    overflow: hidden;
    ::v-deep {
      .van-tabs__wrap {
        position: fixed;
        left: 0;
        right: 40px;
        top: 46px;
      }
      .van-tabs__content {
        height: 100%;
        overflow: auto;
      }
      .van-tabs__line {
        background-color: #1989fa;
      }
      .van-tab {
        padding: 0 20px;
      }
    }
  }
  // logo区域
  .logo {
    background: url('~@/assets/logo.png') no-repeat;
    background-size: cover;
    width: 100px;
    height: 30px;
  }
  // 搜索按钮
  .search-btn {
    background-color: #68b0f8;
    width: 100px;
    font-size: 14px;
    .van-icon {
      color: #fff;
    }
  }
}
</style>
