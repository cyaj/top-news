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
        <van-cell
          v-for="item in articleList"
          :key="item.art_id"
          :title="item.title"
        >
          <!-- 文章显示内容插槽 -->
          <template #label>
            <div>
              <van-grid
                v-if="item.cover.images.length > 0"
                :border="false"
                :column-num="item.cover.images.length"
              >
                <van-grid-item
                  v-for="(img, index) in item.cover.images"
                  :key="index"
                >
                  <van-image
                    lazy-load
                    :src="img"
                    fit="cover"
                    :class="item.cover.images.length === 1 ? 'one' : 'three'"
                  />
                </van-grid-item>
              </van-grid>
              <!-- 文章信息 -->
              <div class="meta">
                <span>{{ item.aut_name }}</span>
                <span>{{ item.comm_count }}评论</span>
                <span>{{ item.pubdate | fromNow }}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
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
      timestamp: Date.now()
    }
  },
  methods: {
    async onLoad () {
      if (this.refreshing) {
        this.articleList = []
        this.timestamp = Date.now()
        this.refreshing = false
      }
      const res = await getArticleList(this.channelId, this.timestamp)
      // console.log(res)
      this.timestamp = res.data.pre_timestamp
      this.articleList = [...this.articleList, ...res.data.results]
      this.loading = false
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
