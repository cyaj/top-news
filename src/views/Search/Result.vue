<template>
  <div class="result">
    <van-nav-bar
      :title="keyword + '的搜索结果'"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- 搜索结果展示 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 大数处理 -->
      <van-cell v-for="item in list" :key="item.art_id.toString()" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchList } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1
    }
  },
  computed: {
    keyword () {
      return this.$route.query.keyword
    }
  },
  methods: {
    async onLoad () {
      const res = await getSearchList(this.keyword, this.page)
      this.list = [...this.list, ...res.data.results]
      this.loading = false
      this.page++
      if (res.data.results.length < 10 || this.list.length >= 50) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  padding-top: 46px;
}
</style>
