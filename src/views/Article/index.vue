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
        <van-image
          :src="artDetail.aut_photo"
          round
          width="1rem"
          height="1rem"
          fit="cover"
        />
        <div class="text">
          <p class="name">{{ artDetail.aut_name }}</p>
          <p class="time">{{ artDetail.pubdate | fromNow }}</p>
        </div>
        <van-button
          round
          size="small"
          :type="artDetail.is_followed ? 'danger' : 'info'"
          @click="toggleFollow"
        >
          {{ artDetail.is_followed ? "取消关注" : "+ 关注" }}
        </van-button>
      </div>
      <!-- 正文 -->
      <div class="content">
        <div v-html="artDetail.content"></div>
      </div>
      <!-- 分割线 -->
      <van-divider
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
        >END</van-divider
      >
      <!-- 点赞 -->
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          type="primary"
          plain
          :icon="artDetail.attitude === 1 ? 'good-job' : 'good-job-o'"
          @click="like"
        >
          {{ artDetail.attitude === 1 ? "取消" : "点赞" }}
        </van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          type="danger"
          plain
          icon="delete"
          @click="dislike"
        >
          {{ artDetail.attitude === 0 ? "取消" : "不喜欢" }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail, cancelLike, giveALike, cancelDisLike, dislikeArticle } from '@/api/article'
import { followUser, unfollowUser } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'Article',
  data () {
    return {
      artDetail: {}, // 文章详情
      loading: true // 控制loading加载显示
    }
  },
  computed: {
    // 传过来的时候已被大数处理过，可放心食用
    artId () {
      return this.$route.params.id
    },
    ...mapState('user', ['token'])
  },
  async created () {
    const res = await getArticleDetail(this.artId)
    this.artDetail = res.data
    this.loading = false
  },
  methods: {
    async toggleFollow () {
      // 判断是否登录
      if (!this.token.token) {
        this.$toast.fail('请先登录')
        this.$router.push({
          path: '/login',
          // 登录后当前文章详情页返回应该返回上次历史而不是登录界面
          // 即登录成功后不以跳转路由的方式返回，而是$router.back()返回，不越过登录页产生历史记录
          query: {
            goBack: true
          }
        })
        return
      }
      if (this.artDetail.is_followed) {
        // 取关
        await unfollowUser(this.artDetail.aut_id)
      }
      if (!this.artDetail.is_followed) {
        // 关注
        await followUser(this.artDetail.aut_id)
      }
      this.$toast.success('操作成功')
      this.artDetail.is_followed = !this.artDetail.is_followed
    },
    // 点赞
    async like () {
      if (!this.token.token) {
        // 没有登录
        this.$toast.fail('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            goBack: true
          }
        })
        return
      }
      if (this.artDetail.attitude === 1) {
        // 取消点赞
        const res = await cancelLike(this.artId)
        console.log(res)
      } else {
        const res = await giveALike(this.artId)
        console.log(res)
      }
      this.$toast.success('操作成功')
      this.artDetail.attitude = this.artDetail.attitude === 1 ? -1 : 1
    },
    // 不喜欢
    async dislike () {
      if (!this.token.token) {
        // 没有登录
        this.$toast.fail('请先登录')
        this.$router.push({
          path: '/login',
          query: {
            goBack: true
          }
        })
        return
      }
      if (this.artDetail.attitude === 0) {
        // 0是不喜欢
        await cancelDisLike(this.artId)
      } else {
        await dislikeArticle(this.artId)
      }
      this.$toast.success('操作成功')
      this.artDetail.attitude = this.artDetail.attitude === 0 ? -1 : 0
    }
  }
}
</script>

<style lang="less" scoped>
.loading {
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.article-container {
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
.error {
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan {
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
    font-size: 14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    ::v-deep img {
      max-width: 100%;
      background: #f9f9f9;
    }
  }
}
</style>
