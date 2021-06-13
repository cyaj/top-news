<template>
  <div>
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
              <span>{{ item.pubdate | formatTime }}</span>
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article'
import moment from 'moment'
export default {
  props: {
    channelId: Number
  },
  filters: {
    formatTime (input) {
      return moment(input).format('YYYY/MM/DD hh:mm')
    }
  },
  data () {
    return {
      articleList: [],
      loading: false,
      finished: false,
      timestamp: Date.now()
    }
  },
  methods: {
    async onLoad () {
      const res = await getArticleList(this.channelId, this.timestamp)
      console.log(res)
      this.timestamp = res.data.pre_timestamp
      this.articleList = [...this.articleList, ...res.data.results]
      this.loading = false
      if (res.data.results.length === 0 || this.articleList.length > 100) {
        this.finished = true
      }
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
</style>
