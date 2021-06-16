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
        <!-- 对应频道文章列表 -->
        <ArticleList :channelId="item.id"></ArticleList>
      </van-tab>
      <!-- 频道列表按钮开关 -->
      <div @click="isShowChannels = true" class="bar-btn">
        <van-icon name="wap-nav"/>
      </div>
    </van-tabs>
    <!-- 频道管理弹出层 -->
    <van-action-sheet v-model="isShowChannels" title="频道管理">
      <!-- v-model语法糖 -->
      <ChannelEdit v-model="active" @close="isShowChannels = false" :isShowChannels="isShowChannels"></ChannelEdit>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './ArticleList'
import ChannelEdit from './ChannelEdit'
import { mapState } from 'vuex'
import { getChannelList } from '@/utils/storage'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      isShowChannels: false
    }
  },
  computed: {
    ...mapState('channel', ['channelList'])
  },
  created () {
    // 一进页面先获取数据存储到vuex中
    this.$store.dispatch('channel/getAllChannelList')
    // 一进页面判断是否登录
    if (this.$store.state.user.token.token) {
      // 登录用户发请求获取频道列表
      this.$store.dispatch('channel/getChannelList')
    } else {
      const res = getChannelList()
      // 本地有
      if (res) {
        this.$store.commit('channel/setChannelList', res)
      } else {
        // 本地没有，发请求获取推荐频道列表(没有携带token获取的是推荐列表)
        this.$store.dispatch('channel/getChannelList')
      }
    }
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
        overflow: hidden;
        .van-tab__pane {
          height: 100%;
          overflow: hidden;
        }
      }
      .van-tabs__line {
        background-color: #1989fa;
      }
      // tab有五个频道时，名字显示不全
      // .van-tab {
      //   padding: 0 20px;
      // }
      // 频道管理的开关按钮
      .bar-btn {
        position: fixed;
        right: 10px;
        top: 57px;
        display: flex;
        align-items: center;
        background-color: #fff;
        opacity: 0.8;
        z-index:1;
        .van-icon-wap-nav{
          font-size: 20px;
        }
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
