<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    />
    <!-- 文章详情 -->
    <!-- 加载中效果 -->
    <div class="loading" v-if="loading">
      <van-loading class="inner" type="spinner" color="#1989fa" />
    </div>
    <div class="detail">
      <h3 class="title">{{ artDetail.title }}</h3>
      <!-- 作者 -->
      <div class="author">
        <van-image :src="artDetail.aut_photo" round width="1rem" height="1rem" fit="cover" />
        <div class="text">
          <p class="name">{{ artDetail.aut_name }}</p>
          <p class="time">{{ artDetail.pubdate | fromNow }}</p>
        </div>
        <van-button round size="small" type="info">+ 关注</van-button>
      </div>
      <!-- 正文 -->
      <div class="content">
        <div v-html="artDetail.content"></div>
      </div>
      <!-- 分割线 -->
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">END</van-divider>
      <!-- 点赞 -->
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">
          点赞
        </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">
          不喜欢
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '@/api/article'
export default {
  name: 'Article',
  data () {
    return {
      artDetail: {}, // 文章详情
      loading: true // 控制loading加载显示
    }
  },
  computed: {
    artId () {
      return this.$route.params.id
    }
  },
  async created () {
    const res = await getArticleDetail(this.artId)
    this.artDetail = res.data
    this.loading = false
  }
}
</script>

<style lang='less' scoped>
.loading {
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    ::v-deep img {
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
