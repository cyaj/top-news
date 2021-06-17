<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 文章列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 单条文章 -->
        <!-- 大数处理 -->
        <van-cell
          v-for="item in articleList"
          :key="item.art_id.toString()"
          :title="item.title"
        >
          <!-- 文章显示内容插槽 -->
          <template #label>
            <div>
              <!-- cover.images.length -->
              <van-grid
                v-if="item.cover.type > 0"
                :border="false"
                :column-num="item.cover.type"
              >
                <van-grid-item
                  v-for="(img, index) in item.cover.images"
                  :key="index"
                >
                  <van-image
                    lazy-load
                    :src="img"
                    fit="cover"
                    :class="item.cover.type === 1 ? 'one' : 'three'"
                  />
                </van-grid-item>
              </van-grid>
              <!-- 文章信息 -->
              <div class="meta">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | fromNow }}</span>
                <!-- <span>{{ item.art_id}}</span> -->
                <!-- 更多操作按钮 -->
                <span
                  class="close"
                  style="float: right"
                  v-if="$store.state.user.token.token"
                  @click="showMoreAction(item.art_id)"
                >
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
          </template>
        </van-cell>
        <!-- 更多操作弹出层 -->
        <van-popup v-model="isShowMoreAction" :style="{ width: '60%' }">
          <!-- 一级操作 -->
          <van-cell-group v-if="isTop">
            <van-cell @click="dislike">不感兴趣</van-cell>
            <van-cell is-link @click="isTop = false">反馈垃圾内容</van-cell>
            <van-cell @click="blacklist">拉黑作者</van-cell>
          </van-cell-group>
          <!-- 二级操作 -->
          <van-cell-group v-else>
            <van-cell icon="arrow-left" @click="isTop = true">返回</van-cell>
            <van-cell v-for="item in reports" :key="item.value" @click="report(item.value)">{{ item.label }}</van-cell>
          </van-cell-group>
        </van-popup>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList, dislikeArticle, reportArticle } from '@/api/article'
import { reports } from '@/api/constants'
export default {
  props: {
    channelId: Number
  },
  data () {
    return {
      articleList: [],
      loading: false,
      finished: false,
      refreshing: false,
      timestamp: Date.now(),
      isShowMoreAction: false,
      isTop: true,
      artId: '',
      reports
    }
  },
  methods: {
    async onLoad () {
      if (this.refreshing) {
        this.articleList = []
        this.timestamp = Date.now()
      }
      const res = await getArticleList(this.channelId, this.timestamp)
      // console.log('123', res.data.results[0].art_id)
      this.timestamp = res.data.pre_timestamp
      this.articleList = [...this.articleList, ...res.data.results]
      this.loading = false
      this.refreshing = false
      if (res.data.results.length === 0 || this.articleList.length > 100) {
        this.finished = true
      }
    },
    async onRefresh () {
      // const res = await getArticleList(this.channelId, Date.now())
      // this.articleList = res.data.results
      // this.timestamp = res.data.pre_timestamp
      // this.refreshing = false
      // this.finished = false
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    showMoreAction (artId) {
      // 大数处理
      this.artId = artId.toString()
      // 每次点击显示都显示一级操作
      this.isTop = true
      this.isShowMoreAction = true
    },
    async dislike () {
      // console.log(this.artId)
      await dislikeArticle(this.artId)
      this.isShowMoreAction = false
      this.$toast.success('操作成功')
      // 大数处理
      this.articleList = this.articleList.filter(item => item.art_id.toString() !== this.artId)
    },
    async report (value) {
      try {
        await reportArticle(this.artId, value)
        this.$toast.success('举报成功')
      } catch (error) {
        this.$toast.fail('您已经举报过该文章')
      }
      this.isShowMoreAction = false
    },
    blacklist () {
      this.$toast.success('拉黑成功')
      this.isShowMoreAction = false
    }
  }
}
</script>

<style lang="less" scoped>
.one {
  width: 100%;
  height: 200px;
}
.three {
  width: 100%;
  height: 100px;
}
.meta {
  span {
    margin-right: 10px;
  }
}
// 单独滚动条，记录滚动位置
.article-list {
  height: 100%;
  overflow: auto;
}
</style>
